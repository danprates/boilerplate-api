export type User = {
  id: string
  isActive: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  password: string
  passwordResetToken?: string
}
