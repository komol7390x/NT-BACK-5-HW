import { BaseEntity } from "src/common/database/base-entity";
import { Action } from "src/common/enum/action";
import { Column, Entity } from "typeorm";

@Entity('book-history')
export class BookHistoryEntity extends BaseEntity {

    // ------------------ TITLE ------------------

    @Column({ type: 'enum', enum: Action, nullable: true, })
    action: Action
}