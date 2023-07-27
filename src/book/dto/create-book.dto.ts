import { IsEmpty, IsString } from "class-validator";

export class CreateBookDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    link: string;

}
