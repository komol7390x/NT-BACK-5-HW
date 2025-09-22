import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";


export class CreateRegiDto {
    // -------------------- FULL NAME --------------------
    
    @ApiProperty({
        name: 'full_name',
        description: 'Email for registration',
        example: 'Admin User',
        required: true
    })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    full_name: string

    // -------------------- EMAIL --------------------

    @ApiProperty({
        name: 'email',
        description: 'Email for enter',
        example: 'www.example1234@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    // -------------------- PASSWORD --------------------

    @ApiProperty({
        name: 'password',
        description: 'Password for registration',
        example: 'User!@Admin123',
        required: true
    })
    @IsStrongPassword()
    @Type(() => String)
    @IsNotEmpty()
    password: string

    // -------------------- AGE --------------------

    @ApiProperty({
        name: 'age',
        description: 'Age for registration',
        example: 30,
        required: true
    })
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    age: number

    // -------------------- IS MARRIED --------------------

    @ApiProperty({
        name: 'is_married',
        description: 'Married for registration',
        example: true,
        required: true
    })
    @IsBoolean()
    @Type(() => Boolean)
    @IsNotEmpty()
    is_married: boolean
}
