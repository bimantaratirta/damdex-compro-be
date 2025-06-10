import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { Request } from 'express';
import { CreateStoreDto } from './dto/create.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateStoreDto } from './dto/update.dto';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { CreateStoreResponseBody, GetOneStoreResponseBody, PaginateStoreResponseBody, UpdateStoreResponseBody } from 'src/types/store.type';
import { ResponseBody } from 'src/types/core.type';

@ApiTags('Store')
@Controller('store')
export class StoreController {
    constructor(
        private readonly storeService: StoreService,
    ) {}

    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateStoreResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async findPaginate(@Query() req: Request) {
        const data = await this.storeService.findPaginate(req);
        const message = 'Stores retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneStoreResponseBody
    })
    async findOne(@Param('id') id: string) {
        const data = await this.storeService.findOne(id);
        const message = 'Store retrieved successfully';
        return { data, message };
    }

    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateStoreResponseBody
    })
    async create(@Body() body: CreateStoreDto) {
        const data = await this.storeService.create(body);
        const message = 'Store created successfully';
        return { data, message };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateStoreResponseBody
    })
    async update(@Param('id') id: string, @Body() body: UpdateStoreDto) {
        const data = await this.storeService.update(id, body);
        const message = 'Store updated successfully';
        return { data, message };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody
    })
    async delete(@Param('id') id: string) {
        await this.storeService.delete(id);
        const message = 'Store deleted successfully';
        return { message };
    }
}
