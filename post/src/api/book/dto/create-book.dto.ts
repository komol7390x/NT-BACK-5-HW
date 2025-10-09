import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    public title!: string

    @IsString()
    @IsNotEmpty()
    public author!: string

    @IsNumber()
    @IsNotEmpty()
    public quantity!: number


    @IsNumber()
    @IsNotEmpty()
    public price!: number

}