import { Transform } from "class-transformer";
import { IsIn, IsOptional, IsString } from "class-validator";

class PaginationDto {
  @IsString()
  @IsOptional()
  cursor!: string;

  @IsString()
  @IsOptional()
  sortField = "id";

  @IsIn(["ASC", "DESC"])
  @IsOptional()
  sortOrder: "ASC" | "DESC" = "ASC";

  @Transform(({ value }) => Math.round(Number(value)))
  @IsIn([10, 20])
  @IsOptional()
  limit: 10 | 20 = 10;
}

export const getPaginationDto = () => PaginationDto;
