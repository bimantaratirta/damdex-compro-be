import { Injectable } from '@nestjs/common';
import { HomepageRepository } from 'src/repositories/homepage.repository';
import { CreateOrUpdateHomepageDto } from './dto/create-or-update.dto';
import { HOMEPAGE_KEY } from 'src/constant/homepage.constant';
import { DeepPartial } from 'typeorm';
import { Homepage } from 'src/entities/homepage.entity';
import { LanguageType } from 'src/types/languange.type';
import { toCamelCase } from 'src/helpers/change-string-format';

@Injectable()
export class HomepageService {
    constructor(
        private homepageRepository: HomepageRepository,
    ) {}

    async createOrUpdate(body: CreateOrUpdateHomepageDto, lang: LanguageType) {
        const sectionNumber: number = body.sectionNumber;
        const homepageKeySection = HOMEPAGE_KEY[`section${sectionNumber}`];

        const dataToUpdate: DeepPartial<Homepage>[] = Object.values(homepageKeySection)
            .map((keySection: string) => ({
                key: keySection,
                language: lang,
                test: toCamelCase(keySection),
                content: body[`${toCamelCase(keySection)}`] as keyof CreateOrUpdateHomepageDto
            }));

        console.log(dataToUpdate);
        // await this.homepageRepository.upsert([
        //     { key: }
        // ])
    }

}
