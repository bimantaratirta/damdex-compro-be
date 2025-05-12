import { Injectable } from '@nestjs/common';
import { HomepageRepository } from 'src/repositories/homepage.repository';
import { CreateOrUpdateHomepageDto } from './dto/create-or-update.dto';
import { HOMEPAGE_KEY } from 'src/constant/homepage.constant';
import { DataSource, DeepPartial, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Homepage } from 'src/entities/homepage.entity';
import { LanguageType } from 'src/types/languange.type';
import { toCamelCase } from 'src/helpers/change-string-format';
import { Request } from 'express';
import { ContentType, ContentTypeEnum } from 'src/types/homepage.type';
import { StorageService } from '../storage/storage.service';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class HomepageService {
    constructor(
        private homepageRepository: HomepageRepository,
        private storageService: StorageService,
        @InjectDataSource()
        private dataSource: DataSource
    ) {}

    async get(req: Request, lang: LanguageType, section: number|undefined) {
        let keys: string[] = Object.values(HOMEPAGE_KEY)
            .flatMap((section) => Object.values(section));
        if (section) {
            const homepageKeySection = HOMEPAGE_KEY[`section${section}`];
            keys = Object.values(homepageKeySection);
        };

        const findWhereOptions: FindOptionsWhere<Homepage>[] = keys.map((key: string) => ({ key, language: lang }))
        let record: Homepage[] = await this.homepageRepository.find({where: findWhereOptions })

        // TODO: After Storage is setting up, add fileUrl when the contentType is image
        record = await Promise.all(record.map(async (item) => {
            if (item.contentType === ContentTypeEnum.IMAGE) {
                item.fileUrl = await this.storageService.getPresignedUrl(item.content);
            }
            return item;
        }))

        return record;
    }

    async createOrUpdate(body: CreateOrUpdateHomepageDto) {
        const sectionNumber: number = body.sectionNumber;
        const language: LanguageType = body.language;
        const homepageKeySection = HOMEPAGE_KEY[`section${sectionNumber}`];

        const dataToUpdate: DeepPartial<Homepage>[] = Object.values(homepageKeySection)
            .map((keySection: string) => ({
                key: keySection,
                language: language,
                content: body[`${toCamelCase(keySection)}`],
                contentType: ContentTypeEnum.TEXT as ContentType,
            }))
            .map((item) => {
                if (this.isMulterFile(item.content)){
                    item.content = this.storageService.save('homepage/files', item.contentType, item.content);
                    item.contentType = ContentTypeEnum.IMAGE;
                }
                
                return item;
            });
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const data = await Promise.all(dataToUpdate.map(async (data) => {
                let record: Homepage = await queryRunner.manager.findOne(Homepage, {where: {key: data.key, language}});
                if (record) {
                    await queryRunner.manager.update(Homepage, { id: record.id }, data)
                } else {
                    await queryRunner.manager.insert(Homepage, data);
                }
                return await queryRunner.manager.findOne(Homepage, {where: { key: data.key, language }});
            }))

            await queryRunner.commitTransaction();
            return data;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    private isMulterFile(file: any): file is Express.Multer.File {
        return (
          file &&
          typeof file === 'object' &&
          typeof file.fieldname === 'string' &&
          typeof file.originalname === 'string' &&
          typeof file.encoding === 'string' &&
          typeof file.mimetype === 'string' &&
          typeof file.size === 'number'
        );
      }
}
