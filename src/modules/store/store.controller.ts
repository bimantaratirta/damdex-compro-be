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
        return this.storeService.findPaginate(req);
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneStoreResponseBody
    })
    async findOne(@Param('id') id: string) {
        return this.storeService.findOne(id);
    }

    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateStoreResponseBody
    })
    async create(@Body() body: CreateStoreDto) {
        return this.storeService.create(body);
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateStoreResponseBody
    })
    async update(@Param('id') id: string, @Body() body: UpdateStoreDto) {
        return this.storeService.update(id, body);
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody
    })
    async delete(@Param('id') id: string) {
        return this.storeService.delete(id);
    }
}
