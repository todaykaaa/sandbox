import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName?: string;

    @ApiProperty()
    @IsString()
    middleName?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    email?: string;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    recalled?: boolean;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    answered?: boolean;

    @ApiProperty({
        required: false,
        default: false,
        description: 'Когда встреча организована, проставляется true',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    appointment?: boolean;
}