import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseBody, ResponsePaginateData } from "./core.type";

class ProjectResponseData {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    heroImage: string;

    @ApiProperty()
    @Expose()
    titleIDN: string;

    @ApiProperty()
    @Expose()
    firstDescriptionIDN: string;

    @ApiProperty()
    @Expose()
    secondDescriptionIDN: string;

    @ApiProperty()
    @Expose()
    titleENG: string;

    @ApiProperty()
    @Expose()
    firstDescriptionENG: string;

    @ApiProperty()
    @Expose()
    secondDescriptionENG: string;
    
    @ApiProperty()
    @Expose()
    heroImageUrl?: string;
    
    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    @ApiProperty()
    @Expose()
    deletedAt: Date | null;
}

export class PaginateProjectResponseData extends ResponsePaginateData {
    @ApiResponseProperty({ type: [ProjectResponseData] })
    @Expose()
    @Type(() => ProjectResponseData)
    payload: ProjectResponseData;
}
    
export class PaginateProjectResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: PaginateProjectResponseData })
    @Expose()
    @Type(() => PaginateProjectResponseData)
    data?: PaginateProjectResponseData;
}

export class CreateProjectResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: ProjectResponseData })
    @Expose()
    @Type(() => ProjectResponseData)
    data?: ProjectResponseData;
}

export class GetOneProjectResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: ProjectResponseData })
    @Expose()
    @Type(() => ProjectResponseData)
    data?: ProjectResponseData;
}

export class UpdateProjectResponseBody extends ResponseBody {
    @ApiResponseProperty({ type: ProjectResponseData })
    @Expose()
    @Type(() => ProjectResponseData)
    data?: ProjectResponseData;
}