import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateProductAdvantageDto, CreateProductDto } from './dto/create.dto';
import { UpdateProductAdvantageDto, UpdateProductDto } from './dto/update.dto';
import { ResponseBody } from 'src/types/core.type';
import { ProductAdvantageService } from './product-advantage.service';
import { CreateProductResponseBody, GetOneProductResponseBody, PaginateProductResponseBody, UpdateProductResponseBody } from 'src/types/product.type';
import { CreateProductAdvantageResponseBody, GetOneProductAdvantageResponseBody, PaginateProductAdvantageResponseBody, UpdateProductAdvantageResponseBody } from 'src/types/product-advantage.type';

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

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private productAdvantageService: ProductAdvantageService,
    ) {}
    
    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateProductResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginateProduct(@Req() req: Request) {
        const data = await this.productService.findPaginate(req);
        const message = 'Products retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneProductResponseBody
    })
    async getOneProduct(@Param('id') id: string){
        const data = await this.productService.findOne(id)
        const message: string = 'Product retrieved successfully';
        return { data, message };
    }
    
    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateProductResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async createProduct(
        @Body() body: CreateProductDto,
        @UploadedFile(new ParseFilePipeBuilder().build()) heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.productService.create(body)
        const message: string = 'Product created successfully';
        return { message, data };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateProductResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async updateProduct(
        @Param('id') id: string,
        @Body() body: UpdateProductDto,
        @UploadedFile() heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.productService.update(id, body)
        const message: string = 'Product updated successfully';
        return { message, data };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async deleteProduct(@Param('id') id: string){
        await this.productService.delete(id)
        const message: string = 'Product deleted successfully';
        return { message };
    }

    @Get('product-advantage')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateProductAdvantageResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginateProductAdvantage(@Req() req: Request) {
        const data = await this.productAdvantageService.findPaginate(req);
        const message = 'Product advantages retrieved successfully';
        return { data, message };
    }

    @Get('product-advantage/:id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneProductAdvantageResponseBody
    })
    async getOneProductAdvantage(@Param('id') id: string){
        const data = await this.productAdvantageService.findOne(id);
        const message: string = 'Product advantage retrieved successfully';
        return { data, message };
    }
    
    @Post('product-advantage')
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateProductAdvantageResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async createProductAdvantage(
        @Body() body: CreateProductAdvantageDto,
        @UploadedFile(new ParseFilePipeBuilder().build()) heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.productAdvantageService.create(body)
        const message: string = 'Product advantage created successfully';
        return { message, data };
    }

    @Patch('product-advantage/:id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateProductAdvantageResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async updateProductAdvantage(
        @Param('id') id: string,
        @Body() body: UpdateProductAdvantageDto,
        @UploadedFile() heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.productAdvantageService.update(id, body)
        const message: string = 'Product advantage updated successfully';
        return { message, data };
    }

    @Delete('product-advantage/:id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async deleteProductAdvantage(@Param('id') id: string){
        await this.productAdvantageService.delete(id)
        const message: string = 'Product advantage deleted successfully';
        return { message };
    }
}
