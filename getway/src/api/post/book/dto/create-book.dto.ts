import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBookDto {
    @ApiPropertyOptional({ description: 'book name', example: 'Harry Poter' })
    @IsString()
    @IsNotEmpty()
    public title!: string

    @ApiPropertyOptional({ description: 'book author', example: 'Rowling' })
    @IsString()
    @IsNotEmpty()
    public author!: string

    @ApiPropertyOptional({ description: 'book quantity', example: 25, type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    public quantity!: number

    @ApiPropertyOptional({ description: 'book price', example: 250000, type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    public price!: number
}
