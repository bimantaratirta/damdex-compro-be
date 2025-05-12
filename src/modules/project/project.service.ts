import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from 'src/repositories/project.repository';
import { CreateProjectDto } from './dto/create.dto';
import { Project } from 'src/entities/project.entity';
import { FindManyOptions } from 'typeorm';
import { FindPaginate } from 'src/helpers/find-paginate';
import { Request } from 'express';
import { UpdateProjectDto } from './dto/update.dto';
import { StorageService } from '../storage/storage.service';
@Injectable()
export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository,
        private storageService: StorageService
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

        // DONE: get image
        data.payload = await Promise.all(
            data.payload.map(async (payload) => {
                payload.heroImageUrl = await this.storageService.getPresignedUrl(payload.heroImage);
                return payload;
            })
        )

        return data;
    }
    
    async findOne(id: string) {
        const project: Project = await this.projectRepository.findOne({ where: { id: Number(id) }});

        if (!project) {
            throw new NotFoundException('Project no longer exists. Please try another news');
        }

        // DONE: get image
        project.heroImageUrl = await this.storageService.getPresignedUrl(project.heroImage);

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
        // DONE: Change this to storage service
        const pathFile = await this.storageService.save('projects', image.mimetype, image);
        project.heroImage = pathFile;

        await this.projectRepository.save(project);
    }
}
