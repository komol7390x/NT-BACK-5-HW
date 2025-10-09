import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    public name!: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email!: string

    @IsNumber()
    @IsNotEmpty()
    public age!: number
}
