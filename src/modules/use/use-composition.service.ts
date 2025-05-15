import { Injectable, NotFoundException } from "@nestjs/common";
import { UseCompositionRepository } from "src/repositories/use-composition.repository";
import { CreateUseCompositionDto } from "./dto/create.dto";
import { UseComposition } from "src/entities/use-composition.entity";
import { UpdateUseCompositionDto } from "./dto/update.dto";
import { Request } from "express";
import { FindManyOptions } from "typeorm";

@Injectable()
export class UseCompositionService {
    constructor(
        private useCompositionRepository: UseCompositionRepository
    ) {}

    async create(body: CreateUseCompositionDto) {
        let newUseComposition: UseComposition = this.useCompositionRepository.create({
            useId: body.useId,
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            descriptionIDN: body.descriptionIDN,
            descriptionENG: body.descriptionENG,
        })

        newUseComposition = await this.useCompositionRepository.save(newUseComposition);

        return newUseComposition;
    }
    
    async findOne(id: string) {
        const useComposition: UseComposition = await this.useCompositionRepository.findOne({ where: { id: Number(id) }});

        if (!useComposition) {
            throw new NotFoundException('Use composition no longer exists. Please try another use composition');
        }

        return useComposition;
    }

    async update(id: string, body: UpdateUseCompositionDto) {
        const useComposition: UseComposition = await this.useCompositionRepository.findOne({ where: { id: Number(id) }});

        if (!useComposition) {
            throw new NotFoundException('Use composition no longer exists. Please try another use composition');
        }

        useComposition.titleIDN = body.titleIDN ?? useComposition.titleIDN,
        useComposition.titleENG = body.titleENG ?? useComposition.titleENG,
        useComposition.descriptionIDN = body.descriptionIDN ?? useComposition.descriptionIDN,
        useComposition.descriptionENG = body.descriptionENG ?? useComposition.descriptionENG,
        useComposition.useId = body.useId ?? useComposition.useId,

        this.useCompositionRepository.save(useComposition);

        return useComposition;
    }

    async delete(id: string): Promise<void> {
        const useComposition: UseComposition = await this.useCompositionRepository.findOne({ where: { id: Number(id) }});

        if (!useComposition) {
            throw new NotFoundException('Use composition no longer exists. Please try another use composition');
        }

        await this.useCompositionRepository.softDelete({ id: useComposition.id });
    }

    async getUseCompositionOptions(req: Request) {
        const useId = req.query.useId;
        const options: FindManyOptions<UseComposition> = {
            relations: {
                useCompositionUseFor: true
            }
        }

        if (useId) {
            options.where = {
                useId: Number(useId)
            }
        }

        const useCompositionOptions = await this.useCompositionRepository.find(options);
        return useCompositionOptions;
    }
}