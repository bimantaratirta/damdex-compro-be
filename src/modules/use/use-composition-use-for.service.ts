import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCompositionUseForRepository } from "src/repositories/use-composition-use-for.repository";
import { CreateUseCompositionUseForDto } from "./dto/create.dto";
import { UseCompositionUseFor } from "src/entities/use-composition-use-for.entity";
import { UpdateUseCompositionUseForDto } from "./dto/update.dto";

@Injectable()
export class UseCompositionUseForService {
    constructor(
        private useCompositionUseForRepository: UseCompositionUseForRepository
    ) {}

    async create(body: CreateUseCompositionUseForDto) {
        let newUseCompositionUseFor: UseCompositionUseFor = this.useCompositionUseForRepository.create({
            useCompositionId: body.useCompositionId,
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            descriptionIDN: body.descriptionIDN,
            descriptionENG: body.descriptionENG,
        })

        newUseCompositionUseFor = await this.useCompositionUseForRepository.save(newUseCompositionUseFor);

        return newUseCompositionUseFor;
    }
    
    async findOne(id: string) {
        const useCompositionUseFor: UseCompositionUseFor = await this.useCompositionUseForRepository.findOne({ where: { id: Number(id) }});

        if (!useCompositionUseFor) {
            throw new NotFoundException('Use composition use for no longer exists. Please try another use composition use for');
        }

        return useCompositionUseFor;
    }

    async update(id: string, body: UpdateUseCompositionUseForDto) {
        const useCompositionUseFor: UseCompositionUseFor = await this.useCompositionUseForRepository.findOne({ where: { id: Number(id) }});

        if (!useCompositionUseFor) {
            throw new NotFoundException('Use composition use for no longer exists. Please try another use composition use for');
        }

        useCompositionUseFor.titleIDN = body.titleIDN ?? useCompositionUseFor.titleIDN,
        useCompositionUseFor.titleENG = body.titleENG ?? useCompositionUseFor.titleENG,
        useCompositionUseFor.descriptionIDN = body.descriptionIDN ?? useCompositionUseFor.descriptionIDN,
        useCompositionUseFor.descriptionENG = body.descriptionENG ?? useCompositionUseFor.descriptionENG,
        useCompositionUseFor.useCompositionId = body.useCompositionId ?? useCompositionUseFor.useCompositionId,

        this.useCompositionUseForRepository.save(useCompositionUseFor);

        return useCompositionUseFor;
    }

    async delete(id: string): Promise<void> {
        const useCompositionUseFor: UseCompositionUseFor = await this.useCompositionUseForRepository.findOne({ where: { id: Number(id) }});

        if (!useCompositionUseFor) {
            throw new NotFoundException('Use composition use for no longer exists. Please try another use composition use for');
        }

        await this.useCompositionUseForRepository.softDelete({ id: useCompositionUseFor.id });
    }
}