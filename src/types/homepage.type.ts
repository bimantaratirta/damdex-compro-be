import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { LanguageType } from "./languange.type";

export class HomepageResponse {
    @ApiResponseProperty()
    @Expose()
    id: number;

    @ApiResponseProperty()
    @Expose()
    language: LanguageType;

    @ApiResponseProperty()
    @Expose()
    key: string;

    @ApiResponseProperty()
    @Expose()
    content: string;

    @ApiResponseProperty()
    @Expose()
    createdAt: Date;

    @ApiResponseProperty()
    @Expose()
    updatedAt: Date;

    @ApiResponseProperty()
    @Expose()
    deletedAt: Date | null;
}