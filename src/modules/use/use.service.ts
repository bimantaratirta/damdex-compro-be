import { Injectable, NotFoundException } from '@nestjs/common';
import { UseRepository } from 'src/repositories/use.repository';
import { CreateUseDto } from './dto/create.dto';
import { Use } from 'src/entities/use.entity';
import { StorageService } from '../storage/storage.service';
import { FindManyOptions } from 'typeorm';
import { FindPaginate } from 'src/helpers/find-paginate';
import { Request } from 'express';
import { UpdateUseDto } from './dto/update.dto';

@Injectable()
export class UseService {
    constructor(
        private useRepository: UseRepository,
        private storageService: StorageService,
    ) {}

    async create(body: CreateUseDto) {
        let newUse: Use = this.useRepository.create({
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
        })

        newUse = await this.useRepository.save(newUse);
        this.saveImageUse(newUse, body.heroImage)

        return newUse;
    }

    async findPaginate(req: Request) {
        const searchables = new Use().getSearchables();

        const options: FindManyOptions<Use> = {}
        const data = await new FindPaginate(this.useRepository, req, searchables, options).build();

        // DONE: get image
        data.payload = await Promise.all(
            data.payload.map(async (payload) => {
                payload.heroImageUrl = payload.heroImage ? await this.storageService.getPresignedUrl(payload.heroImage) : null;
                return payload;
            })
        )

        return data;
    }
    
    async findOne(id: string) {
        const use: Use = await this.useRepository.findOne({ where: { id: Number(id) }, relations: { useComposition: { useCompositionUseFor: true } }});

        if (!use) {
            throw new NotFoundException('Use no longer exists. Please try another use');
        }

        // DONE: get image
        use.heroImageUrl = use.heroImage ? await this.storageService.getPresignedUrl(use.heroImage) : null;

        return use;
    }

    async update(id: string, body: UpdateUseDto) {
        const use: Use = await this.useRepository.findOne({ where: { id: Number(id) }});

        if (!use) {
            throw new NotFoundException('Use no longer exists. Please try another use');
        }

        use.titleIDN = body.titleIDN ?? use.titleIDN,
        use.titleENG = body.titleENG ?? use.titleENG,

        this.useRepository.save(use);

        if (body.heroImage) {
            this.saveImageUse(use, body.heroImage)
        }

        return use;
    }

    async delete(id: string): Promise<void> {
        const use: Use = await this.useRepository.findOne({ where: { id: Number(id) }});

        if (!use) {
            throw new NotFoundException('Use no longer exists. Please try another use');
        }

        await this.useRepository.softDelete({ id: use.id });
    }

    async getUseOptions() {
        const useOptions = await this.useRepository.find();
        return useOptions;
    }

    private async saveImageUse(use: Use, image: Express.Multer.File) {
        // DONE: Change this to storage service
        const pathFile = await this.storageService.save('uses', image.mimetype, image);
        use.heroImage = pathFile;

        await this.useRepository.save(use);
    }
}
