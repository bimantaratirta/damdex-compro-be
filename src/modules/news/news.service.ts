import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { NewsRepository } from 'src/repositories/news.repository';
import { CreateNewsDto } from './dto/create.dto';
import { FindManyOptions } from 'typeorm';
import { News } from 'src/entities/news.entity';
import { FindPaginate } from 'src/helpers/find-paginate';
import { UpdateNewsDto } from './dto/update.dto';
import { StorageService } from '../storage/storage.service';
@Injectable()
export class NewsService {
    constructor(
        private newsRepository: NewsRepository,
        private storageService: StorageService
    ) {}

    async findPaginate(req: Request) {
        const searchables = new News().getSearchables();

        const options: FindManyOptions<News> = {}
        const data = await new FindPaginate(this.newsRepository, req, searchables, options).build();

        // DONE: get image
        data.payload = await Promise.all(
            data.payload.map(async (payload: News) => {
                payload.titleImageUrl = await this.storageService.getPresignedUrl(payload.titleImage);
                return payload;
            })
        )

        return data;
    }

    async findOne(id: string) {
        const news: News = await this.newsRepository.findOne({ where: { id: Number(id) }});

        if (!news) {
            throw new NotFoundException('News no longer exists. Please try another news');
        }

        // DONE: get image
        news.titleImageUrl = await this.storageService.getPresignedUrl(news.titleImage);

        return news;
    }

    async create(body: CreateNewsDto) {
        const newNews: News = this.newsRepository.create({
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            contentIDN: body.contentIDN,
            contentENG: body.contentENG,
            // DONE: Change using storage service
            titleImage: await this.storageService.save('news', body.titleImage.mimetype, body.titleImage),
        });
        return await this.newsRepository.save(newNews);
    }

    async update(id: string, body: UpdateNewsDto) {
        let news: News = await this.newsRepository.findOne({ where: { id: Number(id) }});

        if (!news) {
            throw new NotFoundException('News no longer exists. Please try another news');
        }

        news.titleIDN = body.titleIDN ?? news.titleIDN;
        news.titleENG = body.titleENG ?? news.titleENG;
        news.contentIDN = body.contentIDN ?? news.contentIDN;
        news.contentENG = body.contentENG ?? news.contentENG;
        // DONE: Change using storage service
        news.titleImage = body.titleImage ? await this.storageService.save('news', body.titleImage.mimetype, body.titleImage) : news.titleImage;
        news = await this.newsRepository.save(news);

        return news;
    }

    async delete(id: string): Promise<void> {
        const news: News = await this.newsRepository.findOne({ where: { id: Number(id) }});

        if (!news) {
            throw new NotFoundException('News no longer exists. Please try another news');
        }

        await this.newsRepository.softDelete({ id: news.id });
    }
}
