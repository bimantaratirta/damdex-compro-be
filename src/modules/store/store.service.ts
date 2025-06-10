import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Store } from 'src/entities/store.entity';
import { FindPaginate } from 'src/helpers/find-paginate';
import { StoreRepository } from 'src/repositories/store.repository';
import { FindManyOptions } from 'typeorm';
import { CreateStoreDto } from './dto/create.dto';
import { UpdateStoreDto } from './dto/update.dto';

@Injectable()
export class StoreService {
    constructor(
        private readonly storeRepository: StoreRepository,
    ) {}

    async findPaginate(req: Request) {
        const searchables = new Store().getSearchables();

        const options: FindManyOptions<Store> = {}
        const data = await new FindPaginate(this.storeRepository, req, searchables, options).build();

        return data;
    }

    async findOne(id: string) {
        const store: Store = await this.storeRepository.findOne({ where: { id: Number(id) }});

        if (!store) {
            throw new NotFoundException('Store no longer exists. Please try another store');
        }

        return store;
    }

    async create(body: CreateStoreDto) {
        const newStore: Store = this.storeRepository.create({
            province: body.province,
            city: body.city,
            storeName: body.storeName,
            storeAddress: body.storeAddress,
            storeAddressGoogleMap: body.storeAddressGoogleMap,
            storePhone: body.storePhone,
        });

        return await this.storeRepository.save(newStore);
    }

    async update(id: string, body: UpdateStoreDto) {
        let store: Store = await this.storeRepository.findOne({ where: { id: Number(id) }});

        if (!store) {
            throw new NotFoundException('Store no longer exists. Please try another store');
        }

        store.province = body.province ?? store.province;
        store.city = body.city ?? store.city;
        store.storeName = body.storeName ?? store.storeName;
        store.storeAddress = body.storeAddress ?? store.storeAddress;
        store.storeAddressGoogleMap = body.storeAddressGoogleMap ?? store.storeAddressGoogleMap;
        store.storePhone = body.storePhone ?? store.storePhone;
        await this.storeRepository.save(store);

        return store;
    }

    async delete(id: string): Promise<void> {
        const store: Store = await this.storeRepository.findOne({ where: { id: Number(id) }});

        if (!store) {
            throw new NotFoundException('Store no longer exists. Please try another store');
        }

        await this.storeRepository.softDelete({ id: store.id });
    }
}
