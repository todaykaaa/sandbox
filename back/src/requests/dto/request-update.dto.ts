import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RequestUpdateDto {

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    @Transform(params => JSON.parse(params.value))
    recalled?: boolean;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    @Transform(params => JSON.parse(params.value))
    answered?: boolean;

    @ApiProperty({
        required: false,
        default: false,
        description: 'Когда встреча организована, проставляется true',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    @Transform(params => JSON.parse(params.value))
    appointment?: boolean;
}