import request from './request'
import type { All, Country } from './types'

class CoronaFetch {
  public async all(): Promise<All> {
    return await request().catch(() => null)
  }

  public async country(country: string): Promise<Country> {
    return await request(country).catch(() => null)
  }
}

export default new CoronaFetch()
