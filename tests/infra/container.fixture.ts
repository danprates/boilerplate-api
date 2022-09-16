import { Dependencies } from '@/domain/protocols'

export const containerFixture: Dependencies.Container = {
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn()
  },
  validation: {
    check: jest.fn()
  },
  repository: {
    create: jest.fn(),
    softDelete: jest.fn(),
    hardDelete: jest.fn(),
    find: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  }
}
