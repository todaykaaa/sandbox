import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestQueryDto {

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    @Transform(value => JSON.parse(value.value))
    recalled?: boolean;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    @Transform(value => JSON.parse(value.value))
    answered?: boolean;

    @ApiProperty({
        required: false,
        default: false,
        description: 'Когда встреча организована, проставляется true',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    @Transform(value => JSON.parse(value.value))
    appointment?: boolean;
}