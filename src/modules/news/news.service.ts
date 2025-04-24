import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { NewsRepository } from 'src/repositories/news.repository';
import { CreateNewsDto } from './dto/create.dto';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { News } from 'src/entities/news.entity';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { FindPaginate } from 'src/helpers/find-paginate';
import { UpdateNewsDto } from './dto/update.dto';

@Injectable()
export class NewsService {
    constructor(
        private newsRepository: NewsRepository
    ) {}

    async findPaginate(req: Request) {
        const searchables = new News().getSearchables();

        const options: FindManyOptions<News> = {}
        const data = await new FindPaginate(this.newsRepository, req, searchables, options).build();

        // TODO: get image

        return data;
    }

    async findOne(id: string) {
        const news: News = await this.newsRepository.findOne({ where: { id: Number(id) }});

        if (!news) {
            throw new NotFoundException('News no longer exists. Please try another news');
        }

        // TODO: get image

        return news;
    }

    async create(body: CreateNewsDto) {
        const newNews: News = this.newsRepository.create({
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            contentIDN: body.contentIDN,
            contentENG: body.contentENG,
            // TODO: Change using storage service
            titleImage: this.generateNameFileTemporary(body.titleImage, 'news/image'),
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
        // TODO: Change using storage service
        news.titleImage = body.titleImage ? this.generateNameFileTemporary(body.titleImage, 'news/image') : news.titleImage;
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

    // TODO: delete this, and change usign storage service
    // Temporary function, the original function in storage service
    private generateNameFileTemporary(file: Express.Multer.File, path: string) {
        const randomString = randomBytes(8).toString('hex');
        const fileName = `${randomString}-${Date.now()}${extname(file.originalname)}`;
        const pathFile: string = path.length > 0 ? `${path}/${fileName}` : fileName;
        return pathFile;
    }
}
