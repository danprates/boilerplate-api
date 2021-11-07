import { Column } from 'typeorm'
import { AuthEntity } from './auth.entity'

export class UserEntity extends AuthEntity {
  @Column({ nullable: false })
  name: string
}
