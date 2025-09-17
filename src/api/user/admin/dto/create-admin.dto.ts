import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAdminDto {
    @ApiProperty({ name: 'name', description: 'Admin name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ name: 'username', description: 'Admin username', example: 'john_doe_1' })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ name: 'password', description: 'Admin password', example: '!@JohnDoe123@!' })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}
