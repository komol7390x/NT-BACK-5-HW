import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class CreateLoginDto {
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
        description: 'Email for Password',
        example: 'User!@Admin123',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
