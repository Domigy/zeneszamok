import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsNotEmpty()
    @IsString()
    nev: string;
}
