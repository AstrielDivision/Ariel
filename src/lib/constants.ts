import { join } from 'path'

export const rootDir = join(__dirname, '..', '..')
export const srcDir = join(rootDir, 'src')

export const enum Timeouts {
  Second = 1000,
  Minute = 1000 * 60,
  Hour = 1000 * 60 * 60
}
