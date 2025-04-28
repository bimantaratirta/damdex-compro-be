import { PartialType } from "@nestjs/swagger";
import { CreateGalleryEventDto } from "./create.dto";

export class UpdateGalleryEventDto extends PartialType(CreateGalleryEventDto) {}