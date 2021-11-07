import { Column } from 'typeorm'
import { Base } from './base.entity'

export class AuthEntity extends Base {
  @Column({ nullable: false, unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ name: 'password_reset_token', select: false, nullable: true })
  passwordResetToken?: string
}
