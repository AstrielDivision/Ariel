import request from './request'
import type { All, Country } from './types'

class CoronaFetch {
  public async all(): Promise<All> {
    return await request().catch((err: Error) => console.error(err))
  }

  public async country(country: string): Promise<Country> {
    return await request(country).catch((err: Error) => console.error(err))
  }
}

export default new CoronaFetch()
