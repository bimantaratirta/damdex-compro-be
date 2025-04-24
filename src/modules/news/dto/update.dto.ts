import { PartialType } from "@nestjs/swagger"
import { CreateNewsDto } from "./create.dto";

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}