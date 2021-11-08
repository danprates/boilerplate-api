import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class Base extends BaseEntity {
  // uncomment when using mongodb
  // @ObjectIdColumn()
  // id: ObjectID
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'is_active', default: false, select: false })
  isActive: boolean

  @Column({ name: 'is_deleted', default: false, select: false })
  isDeleted: boolean

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date
}
