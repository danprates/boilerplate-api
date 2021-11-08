import { Column, Entity } from 'typeorm'
import { AuthEntity } from './auth.entity'

@Entity('users')
export class UserEntity extends AuthEntity {
  @Column({ nullable: false })
  name: string
}
