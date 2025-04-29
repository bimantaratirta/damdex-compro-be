import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from 'src/repositories/project.repository';
import { CreateProjectDto } from './dto/create.dto';
import { Project } from 'src/entities/project.entity';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { FindManyOptions } from 'typeorm';
import { FindPaginate } from 'src/helpers/find-paginate';
import { Request } from 'express';
import { UpdateProjectDto } from './dto/update.dto';

@Injectable()
export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository,
    ) {}

    async create(body: CreateProjectDto) {
        let newProject: Project = this.projectRepository.create({
            titleIDN: body.titleIDN,
            titleENG: body.titleENG,
            firstDescriptionIDN: body.firstDescriptionIDN,
            firstDescriptionENG: body.firstDescriptionENG,
            secondDescriptionIDN: body.secondDescriptionIDN,
            secondDescriptionENG: body.secondDescriptionENG,
        })

        newProject = await this.projectRepository.save(newProject);
        this.saveImage(newProject, body.heroImage)

        return newProject;
    }

    async findPaginate(req: Request) {
        const searchables = new Project().getSearchables();

        const options: FindManyOptions<Project> = {}
        const data = await new FindPaginate(this.projectRepository, req, searchables, options).build();

        // TODO: get image

        return data;
    }
    
    async findOne(id: string) {
        const project: Project = await this.projectRepository.findOne({ where: { id: Number(id) }});

        if (!project) {
            throw new NotFoundException('Project no longer exists. Please try another news');
        }

        // TODO: get image

        return project;
    }

    async update(id: string, body: UpdateProjectDto) {
        const project: Project = await this.projectRepository.findOne({ where: { id: Number(id) }});

        if (!project) {
            throw new NotFoundException('Gallery event no longer exists. Please try another news');
        }

        project.titleIDN = body.titleIDN ?? project.titleIDN,
        project.titleENG = body.titleENG ?? project.titleENG,
        project.firstDescriptionIDN = body.firstDescriptionIDN ?? project.firstDescriptionIDN,
        project.firstDescriptionENG = body.firstDescriptionENG ?? project.firstDescriptionENG,
        project.secondDescriptionIDN = body.secondDescriptionIDN ?? project.secondDescriptionIDN,
        project.secondDescriptionENG = body.secondDescriptionENG ?? project.secondDescriptionENG,

        this.projectRepository.save(project);

        if (body.heroImage) {
            this.saveImage(project, body.heroImage)
        }

        return project;
    }

    async delete(id: string): Promise<void> {
        const project: Project = await this.projectRepository.findOne({ where: { id: Number(id) }});

        if (!project) {
            throw new NotFoundException('Project no longer exists. Please try another project');
        }

        await this.projectRepository.softDelete({ id: project.id });
    }

    private async saveImage(project: Project, image: Express.Multer.File) {
        // TODO: Change this to storage service
        const pathFile = this.generateNameFileTemporary(image, 'gallery-events/image');
        project.heroImage = pathFile;

        await this.projectRepository.save(project);
    }

    // TODO: delete this, and change using storage service
    // Temporary function, the original function in storage service
    private generateNameFileTemporary(file: Express.Multer.File, path: string) {
        const randomString = randomBytes(8).toString('hex');
        const fileName = `${randomString}-${Date.now()}${extname(file.originalname)}`;
        const pathFile: string = path.length > 0 ? `${path}/${fileName}` : fileName;
        return pathFile;
    }
}
