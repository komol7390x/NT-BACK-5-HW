import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  // -------------------- ID --------------------

  @PrimaryGeneratedColumn()
  id: number;
  // -------------------- CREATED AT --------------------
  @CreateDateColumn()
  created_at: Date;

  // -------------------- UPDATED AT --------------------

  @UpdateDateColumn()
  updated_at: Date;

  // -------------------- DELETED AT --------------------

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;
}
