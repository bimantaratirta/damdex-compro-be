import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Project } from "src/entities/project.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class ProjectRepository extends Repository<Project> {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {
        super(Project, entityManager);
    }
}