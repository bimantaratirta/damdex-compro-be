import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductAdvantageDto } from "./dto/create.dto";
import { ProductAdvantage } from "src/entities/product-advantage.entity";
import { ProductAdvantageRepository } from "src/repositories/product-advantage.repository";
import { FindManyOptions } from "typeorm";
import { FindPaginate } from "src/helpers/find-paginate";
import { Request } from "express";
import { UpdateProductAdvantageDto } from "./dto/update.dto";
import { randomBytes } from "crypto";
import { extname } from "path";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class ProductAdvantageService {
    constructor(
        private productAdvantageRepository: ProductAdvantageRepository,
        private storageService: StorageService
    ) {}
    
    async create(body: CreateProductAdvantageDto) {
        let newProductAdvantage: ProductAdvantage = this.productAdvantageRepository.create({
            productId: body.productId,
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            descriptionIDN: body.descriptionIDN,
            descriptionENG: body.descriptionENG,
        })

        newProductAdvantage = await this.productAdvantageRepository.save(newProductAdvantage);
        this.saveImage(newProductAdvantage, body.heroImage)

        return newProductAdvantage;
    }

    async findPaginate(req: Request) {
        const searchables = new ProductAdvantage().getSearchables();

        const options: FindManyOptions<ProductAdvantage> = {}
        const data = await new FindPaginate(this.productAdvantageRepository, req, searchables, options).build();

        // TODO: get image
        data.payload = await Promise.all(
            data.payload.map(async (payload) => {
                payload.heroImageUrl = await this.storageService.getPresignedUrl(payload.heroImage);
                return payload;
            })
        )

        return data;
    }
    
    async findOne(id: string) {
        const productAdvantage: ProductAdvantage = await this.productAdvantageRepository.findOne({ where: { id: Number(id) }});

        if (!productAdvantage) {
            throw new NotFoundException('Product no longer exists. Please try another news');
        }

        // DONE: get image
        productAdvantage.heroImageUrl = await this.storageService.getPresignedUrl(productAdvantage.heroImage);

        return productAdvantage;
    }

    async update(id: string, body: UpdateProductAdvantageDto) {
        const productAdvantage: ProductAdvantage = await this.productAdvantageRepository.findOne({ where: { id: Number(id) }});

        if (!productAdvantage) {
            throw new NotFoundException('Gallery event no longer exists. Please try another news');
        }

        productAdvantage.titleIDN = body.titleIDN ?? productAdvantage.titleIDN,
        productAdvantage.titleENG = body.titleENG ?? productAdvantage.titleENG,
        productAdvantage.descriptionIDN = body.descriptionIDN ?? productAdvantage.descriptionIDN,
        productAdvantage.descriptionENG = body.descriptionENG ?? productAdvantage.descriptionIDN,

        this.productAdvantageRepository.save(productAdvantage);

        if (body.heroImage) {
            this.saveImage(productAdvantage, body.heroImage)
        }

        return productAdvantage;
    }

    async delete(id: string): Promise<void> {
        const product: ProductAdvantage = await this.productAdvantageRepository.findOne({ where: { id: Number(id) }});

        if (!product) {
            throw new NotFoundException('Project no longer exists. Please try another product');
        }

        await this.productAdvantageRepository.softDelete({ id: product.id });
    }

    private async saveImage(productAdvantage: ProductAdvantage, image: Express.Multer.File) {
        // DONE: Change this to storage service
        const pathFile = await this.storageService.save('product-advantages', image.mimetype, image);
        productAdvantage.heroImage = pathFile;

        await this.productAdvantageRepository.save(productAdvantage);
    }
}
