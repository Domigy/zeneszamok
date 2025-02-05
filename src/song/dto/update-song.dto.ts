import { PartialType } from '@nestjs/swagger';
import { CreateSongDto } from './create-song.dto';
import { IsNotEmpty, IsNumber, isNumber, Max, Min, min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSongDto extends PartialType(CreateSongDto) {
    @IsNumber()
    /**
     * The song rate, 1 to 5
     */
    @ApiProperty({example: 3})
    @Min(1)
    @Max(5)
    ertekeles: number;
}
