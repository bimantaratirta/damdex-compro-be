import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';
import { ResponseBody } from 'src/types/core.type';

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
    ) {}
    
    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        // typeResponse: PaginateProjectResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginateProduct(@Req() req: Request) {
        const data = await this.productService.findPaginateProduct(req);
        const message = 'Products retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        // typeResponse: GetOneProjectResponseBody
    })
    async getOneProduct(@Param('id') id: string){
        const data = await this.productService.findOneProduct(id)
        const message: string = 'Product retrieved successfully';
        return { data, message };
    }
    
    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        // typeResponse: CreateProductResponseBody
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

        const data = await this.productService.createProduct(body)
        const message: string = 'Product created successfully';
        return { message, data };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        // typeResponse: UpdateProjectResponseBody
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

        const data = await this.productService.updateProduct(id, body)
        const message: string = 'Product updated successfully';
        return { message, data };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async deleteProduct(@Param('id') id: string){
        await this.productService.deleteProduct(id)
        const message: string = 'Product deleted successfully';
        return { message };
    }
}
