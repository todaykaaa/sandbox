import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { SortByEnum } from '../enum/sort-by.enum';
import { Transform } from 'class-transformer';

export class PostQueryDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    categoryUrl?: string;

    @ApiProperty({ enum: SortByEnum, default: SortByEnum.desc, isArray: false })
    @IsOptional()
    @IsEnum(SortByEnum)
    sort?: string;

    @ApiProperty({ default: 8 })
    @IsOptional()
    @IsInt()
    @Transform(params => parseInt(params.value))
    pageSize?: number;

    @ApiProperty({ default: 1 })
    @IsOptional()
    @IsInt()
    @Transform(params => parseInt(params.value))
    pageNumber?: number;

}