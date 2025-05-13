import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UseService } from './use.service';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { UseCompositionService } from './use-composition.service';
import { UseCompositionUseForService } from './use-composition-use-for.service';
import { Request } from 'express';
import { CreateUseResponseBody, GetOneUseResponseBody, PaginateUseResponseBody, UpdateUseResponseBody, UseOptionsResponseBody } from 'src/types/use.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateUseCompositionDto, CreateUseCompositionUseForDto, CreateUseDto } from './dto/create.dto';
import { UpdateUseCompositionDto, UpdateUseDto } from './dto/update.dto';
import { ResponseBody } from 'src/types/core.type';
import { CreateUseCompositionResponseBody, GetOneUseCompositionResponseBody, UpdateUseCompositionResponseBody, UseCompositionOptionsResponseBody } from 'src/types/use-composition.type';
import { CreateUseCompositionUseForResponseBody, GetOneUseCompositionUseForResponseBody, UpdateUseCompositionUseForResponseBody } from 'src/types/use-composition-use-for.type';

const maxFileSize: number = 5 * 1024 * 1024; // 5 MB
const fileFilterConfig = (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
): void => {
    if (file.size > maxFileSize) {
        return callback(new BadRequestException('Max file size is 5 MB'), false)
    }
  
    callback(null, true);
};

@ApiTags('Uses')
@Controller('use')
export class UseController {
    constructor(
        private useService: UseService,
        private useCompositionService: UseCompositionService,
        private useCompositionUseForService: UseCompositionUseForService
    ) {}

    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateUseResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginateUse(@Req() req: Request) {
        const data = await this.useService.findPaginate(req);
        const message = 'Uses retrieved successfully';
        return { data, message };
    }

    @Get('get-use-options')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: UseOptionsResponseBody
    })
    async getUseOptions() {
        const data = await this.useService.getUseOptions();
        const message = 'Use options retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneUseResponseBody
    })
    async getOneUse(@Param('id') id: string){
        const data = await this.useService.findOne(id)
        const message: string = 'Use retrieved successfully';
        return { data, message };
    }
    
    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateUseResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async createUse(
        @Body() body: CreateUseDto,
        @UploadedFile(new ParseFilePipeBuilder().build()) heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.useService.create(body)
        const message: string = 'Use created successfully';
        return { message, data };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateUseResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async updateUse(
        @Param('id') id: string,
        @Body() body: UpdateUseDto,
        @UploadedFile() heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.useService.update(id, body)
        const message: string = 'Use updated successfully';
        return { message, data };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async deleteUse(@Param('id') id: string){
        await this.useService.delete(id)
        const message: string = 'Use deleted successfully';
        return { message };
    }

    /**
     * Use Composition Route API
     */
    @Get('use-composition/get-use-composition-options')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: UseCompositionOptionsResponseBody
    })
    @ApiQuery({ name: 'useId', description: 'to filter the data base on useId', type: 'number', example: '1' })
    async getUseCompositionOptions(@Req() req: Request) {
        const data = await this.useCompositionService.getUseCompositionOptions(req);
        const message = 'Use composition options retrieved successfully';
        return { data, message };
    }

    @Get('use-composition/:id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneUseCompositionResponseBody
    })
    async getOneUseComposition(@Param('id') id: string){
        const data = await this.useCompositionService.findOne(id);
        const message: string = 'Use composition retrieved successfully';
        return { data, message };
    }
    
    @Post('use-composition')
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateUseCompositionResponseBody
    })
    async createUseComposition(
        @Body() body: CreateUseCompositionDto,
    ) {
        const data = await this.useCompositionService.create(body)
        const message: string = 'Use composition created successfully';
        return { message, data };
    }

    @Patch('use-composition/:id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateUseCompositionResponseBody
    })
    async updateUseComposition(
        @Param('id') id: string,
        @Body() body: UpdateUseCompositionDto,
    ) {
        const data = await this.useCompositionService.update(id, body)
        const message: string = 'Use composition updated successfully';
        return { message, data };
    }

    @Delete('use-composition/:id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async deleteUseComposition(@Param('id') id: string){
        await this.useCompositionService.delete(id)
        const message: string = 'Use composition deleted successfully';
        return { message };
    }

    /**
     * Use Composition Use For Route API
     */
    @Get('use-composition-use-for/:id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneUseCompositionUseForResponseBody
    })
    async getOneUseCompositionUseFor(@Param('id') id: string){
        const data = await this.useCompositionUseForService.findOne(id);
        const message: string = 'Use composition use for retrieved successfully';
        return { data, message };
    }
    
    @Post('use-composition-use-for')
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateUseCompositionUseForResponseBody
    })
    async createUseCompositionUseFor(
        @Body() body: CreateUseCompositionUseForDto,
    ) {
        const data = await this.useCompositionUseForService.create(body)
        const message: string = 'Use composition use for created successfully';
        return { message, data };
    }

    @Patch('use-composition-use-for/:id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateUseCompositionUseForResponseBody
    })
    async updateUseCompositionUseFor(
        @Param('id') id: string,
        @Body() body: UpdateUseCompositionDto,
    ) {
        const data = await this.useCompositionUseForService.update(id, body)
        const message: string = 'Use composition use for updated successfully';
        return { message, data };
    }

    @Delete('use-composition-use-for/:id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async deleteUseCompositionUseFor(@Param('id') id: string){
        await this.useCompositionUseForService.delete(id)
        const message: string = 'Use composition use for deleted successfully';
        return { message };
    }
}
