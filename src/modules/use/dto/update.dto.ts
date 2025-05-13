import { PartialType } from "@nestjs/swagger";
import { CreateUseCompositionDto, CreateUseCompositionUseForDto, CreateUseDto } from "./create.dto";

export class UpdateUseDto extends PartialType(CreateUseDto) {}

export class UpdateUseCompositionDto extends PartialType(CreateUseCompositionDto) {}

export class UpdateUseCompositionUseForDto extends PartialType(CreateUseCompositionUseForDto) {}