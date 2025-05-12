import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { ProductAdvantageRepository } from 'src/repositories/product-advantage.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { CreateProductDto } from './dto/create.dto';
import { FindManyOptions } from 'typeorm';
import { FindPaginate } from 'src/helpers/find-paginate';
import { Request } from 'express';
import { UpdateProductDto } from './dto/update.dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        private storageService: StorageService
    ) {}
    
    async create(body: CreateProductDto) {
        let newProduct: Product = this.productRepository.create({
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            descriptionIDN: body.descriptionIDN,
            descriptionENG: body.descriptionENG,
        })

        newProduct = await this.productRepository.save(newProduct);
        this.saveImageProduct(newProduct, body.heroImage)

        return newProduct;
    }

    async findPaginate(req: Request) {
        const searchables = new Product().getSearchables();

        const options: FindManyOptions<Product> = {}
        const data = await new FindPaginate(this.productRepository, req, searchables, options).build();

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
        const product: Product = await this.productRepository.findOne({ where: { id: Number(id) }, relations: { productAdvantage: true }});

        if (!product) {
            throw new NotFoundException('Product no longer exists. Please try another news');
        }

        // DONE: get image
        product.heroImageUrl = product.heroImage ? await this.storageService.getPresignedUrl(product.heroImage) : null;
        product.productAdvantage = await Promise.all(
            product.productAdvantage.map(async (payload) => {
                payload.heroImageUrl = payload.heroImage ? await this.storageService.getPresignedUrl(payload.heroImage) : null;
                return payload;
            })
        )

        return product;
    }

    async update(id: string, body: UpdateProductDto) {
        const product: Product = await this.productRepository.findOne({ where: { id: Number(id) }});

        if (!product) {
            throw new NotFoundException('Gallery event no longer exists. Please try another news');
        }

        product.titleIDN = body.titleIDN ?? product.titleIDN,
        product.titleENG = body.titleENG ?? product.titleENG,
        product.descriptionIDN = body.descriptionIDN ?? product.descriptionIDN,
        product.descriptionENG = body.descriptionENG ?? product.descriptionIDN,

        this.productRepository.save(product);

        if (body.heroImage) {
            this.saveImageProduct(product, body.heroImage)
        }

        return product;
    }

    async delete(id: string): Promise<void> {
        const product: Product = await this.productRepository.findOne({ where: { id: Number(id) }});

        if (!product) {
            throw new NotFoundException('Project no longer exists. Please try another product');
        }

        await this.productRepository.softDelete({ id: product.id });
    }

    async getProductOptions() {
        const productOptions = await this.productRepository.find();
        return productOptions;
    }

    private async saveImageProduct(product: Product, image: Express.Multer.File) {
        // DONE: Change this to storage service
        const pathFile = await this.storageService.save('products', image.mimetype, image);
        product.heroImage = pathFile;

        await this.productRepository.save(product);
    }
}
