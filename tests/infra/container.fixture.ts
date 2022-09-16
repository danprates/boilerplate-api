import { Dependencies } from '@/domain/protocols'
import { vi } from 'vitest'

export const containerFixture: Dependencies.Container = {
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn()
  },
  validation: {
    check: vi.fn()
  },
  repository: {
    create: vi.fn(),
    softDelete: vi.fn(),
    hardDelete: vi.fn(),
    find: vi.fn(),
    list: vi.fn(),
    update: vi.fn()
  }
}
