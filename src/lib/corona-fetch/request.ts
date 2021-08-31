/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import c from './constants'

export default async function request(country?: string): Promise<any> {
  if (!country) {
    const res = await fetch(
      c.baseURL + c.endpoint.all,
      {
        method: FetchMethods.Get,
        headers: {
          'User-Agent': c.useragent
        }
      },
      FetchResultTypes.JSON
    )
    return res
  }
  const res = await fetch(
    `${c.baseURL}${c.endpoint.country}/${country}`,
    {
      method: FetchMethods.Get,
      headers: {
        'User-Agent': c.useragent
      }
    },
    FetchResultTypes.JSON
  )
  return res
}
