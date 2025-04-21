import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { HOMEPAGE } from 'src/constant/homepage.constant';
import { HomepageIdnRepository } from 'src/repositories/homepages/homepage-id.repository';

@Injectable()
export class HomepageIdService {
    constructor(
        private homepageIdnRepository: HomepageIdnRepository,
    ) {}

    async getContentHomepage (req: Request) {
        const section = req.query.section;
        const detail = HOMEPAGE[`section${section}`];
        console.log(detail);
    }
}
