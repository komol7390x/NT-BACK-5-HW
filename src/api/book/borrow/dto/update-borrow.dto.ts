import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBorrowDto } from './create-borrow.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBorrowDto extends PartialType(CreateBorrowDto) {
    // ------------------ BORROW DATE ------------------
    @ApiProperty({
        description: 'The date when the item was borrowed',
        example: '2025-09-16',
        pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
    })
    @IsString()
    @IsOptional()
    borrow_date?: string;

    // ------------------ DUE DATE ------------------
    @ApiProperty({
        description: 'The due date for returning the item',
        example: '2025-09-23',
    })
    @IsString()
    @IsOptional()
    due_date?: string;
}
