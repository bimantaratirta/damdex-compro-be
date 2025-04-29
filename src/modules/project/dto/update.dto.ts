import { PartialType } from "@nestjs/swagger";
import { CreateProjectDto } from "./create.dto";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}