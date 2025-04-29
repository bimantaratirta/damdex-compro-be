import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FunctionRule } from 'src/decorators/rule.decorator';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateProjectDto } from './dto/create.dto';
import { UpdateProjectDto } from './dto/update.dto';
import { ResponseBody } from 'src/types/core.type';
import { CreateProjectResponseBody, GetOneProjectResponseBody, PaginateProjectResponseBody, UpdateProjectResponseBody } from 'src/types/project.type';

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

@ApiTags('Project')
@Controller('project')
export class ProjectController {
    constructor(
        private projectService: ProjectService,
    ) {}

    @Get()
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: PaginateProjectResponseBody
    })
    @ApiQuery({ name: 'page', description: 'to filter the data base on page with a specific limit', type: 'number', example: '1' })
    @ApiQuery({ name: 'limit', description: 'to limit the data to be retrieved (default: 25)', type: 'number', example: '25' })
    async getPaginate(@Req() req: Request) {
        const data = await this.projectService.findPaginate(req);
        const message = 'Projects retrieved successfully';
        return { data, message };
    }

    @Get(':id')
    @FunctionRule({
        auth: false,
        code: HttpStatus.OK,
        typeResponse: GetOneProjectResponseBody
    })
    async getOne(@Param('id') id: string){
        const data = await this.projectService.findOne(id)
        const message: string = 'Project retrieved successfully';
        return { data, message };
    }
    
    @Post()
    @FunctionRule({
        code: HttpStatus.CREATED,
        typeResponse: CreateProjectResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async create(
        @Body() body: CreateProjectDto,
        @UploadedFile(new ParseFilePipeBuilder().build()) heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.projectService.create(body)
        const message: string = 'Project created successfully';
        return { message, data };
    }

    @Patch(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: UpdateProjectResponseBody
    })
    @UseInterceptors(FileInterceptor('heroImage', {storage: memoryStorage(), fileFilter: fileFilterConfig }))
    @ApiConsumes('multipart/form-data')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateProjectDto,
        @UploadedFile() heroImage: Express.Multer.File
    ) {
        if (heroImage) {
            body.heroImage = heroImage;
        }

        const data = await this.projectService.update(id, body)
        const message: string = 'Project updated successfully';
        return { message, data };
    }

    @Delete(':id')
    @FunctionRule({
        code: HttpStatus.OK,
        typeResponse: ResponseBody,
    })
    async delete(@Param('id') id: string){
        await this.projectService.delete(id)
        const message: string = 'Project deleted successfully';
        return { message };
    }
}
