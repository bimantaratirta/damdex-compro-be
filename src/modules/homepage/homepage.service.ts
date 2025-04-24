import { Injectable } from '@nestjs/common';
import { HomepageRepository } from 'src/repositories/homepage.repository';
import { CreateOrUpdateHomepageDto } from './dto/create-or-update.dto';
import { HOMEPAGE_KEY } from 'src/constant/homepage.constant';
import { DeepPartial, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Homepage } from 'src/entities/homepage.entity';
import { LanguageType } from 'src/types/languange.type';
import { toCamelCase } from 'src/helpers/change-string-format';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { Request } from 'express';
import { ContentType, ContentTypeEnum } from 'src/types/homepage.type';

@Injectable()
export class HomepageService {
    constructor(
        private homepageRepository: HomepageRepository,
    ) {}

    async get(req: Request, lang: LanguageType, section: number|undefined) {
        let keys: string[] = Object.values(HOMEPAGE_KEY)
            .flatMap((section) => Object.values(section));
        if (section) {
            const homepageKeySection = HOMEPAGE_KEY[`section${section}`];
            keys = Object.values(homepageKeySection);
        };

        const findWhereOptions: FindOptionsWhere<Homepage>[] = keys.map((key: string) => ({ key, language: lang }))
        const record: Homepage[] = await this.homepageRepository.find({where: findWhereOptions })

        // TODO: After Storage is setting up, add fileUrl when the contentType is image

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
                    item.content = this.generateNameFileTemporary(item.content, 'homepage/image');
                    item.contentType = ContentTypeEnum.IMAGE;
                }
                
                return item;
            });
        
        const data = await Promise.all(dataToUpdate.map(async (data) => {
            let record: Homepage = await this.homepageRepository.findOne({where: {key: data.key, language}});
            if (record) {
                await this.homepageRepository.update({ id: record.id }, data)
            } else {
                await this.homepageRepository.insert(data);
            }
            return await this.homepageRepository.findOne({where: { key: data.key, language }});
        }))
        
        return data;
    }

    // TODO: Delete this
    // Temporary function, the original function in storage service
    private generateNameFileTemporary(file: Express.Multer.File, path: string) {
        const randomString = randomBytes(8).toString('hex');
        const fileName = `${randomString}-${Date.now()}${extname(file.originalname)}`;
        const pathFile: string = path.length > 0 ? `${path}/${fileName}` : fileName;
        return pathFile;
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
