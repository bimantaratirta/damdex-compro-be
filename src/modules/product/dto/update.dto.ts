import { PartialType } from "@nestjs/swagger";
import { CreateProductAdvantageDto, CreateProductDto } from "./create.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class UpdateProductAdvantageDto extends PartialType(CreateProductAdvantageDto) {}