import { Injectable, NotFoundException } from '@nestjs/common';
import { GalleryEventRepository } from 'src/repositories/gallery-event.repository';
import { CreateGalleryEventDto } from './dto/create.dto';
import { GalleryEvent } from 'src/entities/gallery-event.entity';
import * as moment from 'moment';
import { FindPaginate } from 'src/helpers/find-paginate';
import { FindManyOptions } from 'typeorm';
import { Request } from 'express';
import { UpdateGalleryEventDto } from './dto/update.dto';
import { StorageService } from '../storage/storage.service';
@Injectable()
export class GalleryEventService {
    constructor(
        private galleryEventRepository: GalleryEventRepository,
        private storageService: StorageService
    ) {}

    async create(body: CreateGalleryEventDto) {
        let newEvent: GalleryEvent = this.galleryEventRepository.create({
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            eventDate: moment(body.eventDate).toDate(),
            eventVenueIDN: body.eventVenueIDN,
            eventVenueENG: body.eventVenueENG,
            eventThemeIDN: body.eventThemeIDN,
            eventThemeENG: body.eventThemeENG,
            eventDescriptionIDN: body.eventDescriptionIDN,
            eventDescriptionENG: body.eventDescriptionENG,
        })

        newEvent = await this.galleryEventRepository.save(newEvent);
        this.saveImage(newEvent, body.heroImage)

        return newEvent;
    }

    async findPaginate(req: Request) {
        const searchables = new GalleryEvent().getSearchables();

        const options: FindManyOptions<GalleryEvent> = {}
        const data = await new FindPaginate(this.galleryEventRepository, req, searchables, options).build();

        // DONE: get image
        data.payload = await Promise.all(
            data.payload.map(async (payload) => {
                payload.heroImageUrl = await this.storageService.getPresignedUrl(payload.heroImage);
                return payload;
            })
        )

        return data;
    }
    
    async findOne(id: string) {
        const galleryEvent: GalleryEvent = await this.galleryEventRepository.findOne({ where: { id: Number(id) }});

        if (!galleryEvent) {
            throw new NotFoundException('Gallery event no longer exists. Please try another gallery event');
        }

        // DONE: get image
        galleryEvent.heroImageUrl = await this.storageService.getPresignedUrl(galleryEvent.heroImage);
        
        return galleryEvent;
    }

    async update(id: string, body: UpdateGalleryEventDto) {
        const galleryEvent: GalleryEvent = await this.galleryEventRepository.findOne({ where: { id: Number(id) }});

        if (!galleryEvent) {
            throw new NotFoundException('Gallery event no longer exists. Please try another gallery event');
        }

        galleryEvent.titleIDN = body.titleIDN ?? galleryEvent.titleIDN,
        galleryEvent.titleENG = body.titleENG ?? galleryEvent.titleENG,
        galleryEvent.eventDate = body.eventDate ? moment(body.eventDate).toDate() : galleryEvent.eventDate,
        galleryEvent.eventVenueIDN = body.eventVenueIDN ?? galleryEvent.eventVenueIDN,
        galleryEvent.eventVenueENG = body.eventVenueENG ?? galleryEvent.eventVenueENG,
        galleryEvent.eventThemeIDN = body.eventThemeIDN ?? galleryEvent.eventThemeIDN,
        galleryEvent.eventThemeENG = body.eventThemeENG ?? galleryEvent.eventThemeENG,
        galleryEvent.eventDescriptionIDN = body.eventDescriptionIDN ?? galleryEvent.eventDescriptionIDN,
        galleryEvent.eventDescriptionENG = body.eventDescriptionENG ?? galleryEvent.eventDescriptionENG,

        this.galleryEventRepository.save(galleryEvent);

        if (body.heroImage) {
            this.saveImage(galleryEvent, body.heroImage)
        }

        return galleryEvent;
    }

    async delete(id: string): Promise<void> {
        const galleryEvent: GalleryEvent = await this.galleryEventRepository.findOne({ where: { id: Number(id) }});

        if (!galleryEvent) {
            throw new NotFoundException('Gallery Event no longer exists. Please try another gallery event');
        }

        await this.galleryEventRepository.softDelete({ id: galleryEvent.id });
    }

    private async saveImage(galleryEvent: GalleryEvent, image: Express.Multer.File) {
        // DONE: Change this to storage service
        const pathFile = await this.storageService.save('gallery-events', image.mimetype, image);
        galleryEvent.heroImage = pathFile;

        await this.galleryEventRepository.save(galleryEvent);
    }
}
