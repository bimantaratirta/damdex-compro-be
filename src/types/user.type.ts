import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserResponse {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  firstName: string;

  @ApiResponseProperty()
  @Expose()
  lastName: string;

  @ApiResponseProperty()
  @Expose()
  username: string;

  @ApiResponseProperty()
  @Expose()
  email: string;

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