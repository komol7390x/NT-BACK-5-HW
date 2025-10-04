import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('errors')
export class ErrorEntity extends BaseEntity {
  @Column({ type: 'text' })
  errorMessage: string;

  @Column({ type: 'int' })
  statusCode: number;
}
