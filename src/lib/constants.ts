import { join } from 'path'
import pkg from '../package'

export const userAgent = `Ariel/${pkg.version} (https://github.com/AstrielDivision/Ariel)`

export const rootDir = join(__dirname, '..', '..')
export const srcDir = join(rootDir, 'src')

export const enum Timeouts {
  Second = 1000,
  Minute = 1000 * 60,
  Hour = 1000 * 60 * 60
}
