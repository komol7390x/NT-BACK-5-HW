import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCustomerDto {
    @ApiPropertyOptional({ description: 'user name', example: 'Alisher' })
    @IsString()
    @IsNotEmpty()
    public name!: string


    @ApiPropertyOptional({ description: 'user email', example: 'www.example@gmail.com' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email!: string


    @ApiPropertyOptional({ description: 'user age', example: 28, type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    public age!: number
}
