import { join } from 'path'
import { pkg } from './Package'

export const userAgent = `Ariel/${pkg.version} (https://github.com/AstrielDivision/Ariel)`

export const rootDir = join(__dirname, '..', '..')
export const srcDir = join(rootDir, 'src')
