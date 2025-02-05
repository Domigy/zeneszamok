import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * The data required to creat a new phone
 */
export class CreateSongDto {
    /**
     * The model of the song
     */
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Egy életen át'})
    cim: string;
    
    /**
     * The artist of the song.
     */
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Depresszió'})
    szerzo: string;
    
    /**
     * The hossz of the song on second.
     */
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 480})
    hossz: number;

    /**
     * The price of the song in huf.
     * 0 is free
     */
    @IsNotEmpty()
    @ApiProperty({example: 1500})
    @IsNumber()
    ar: number;
    
}
