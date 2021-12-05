import { request as fetch } from '@artiefuzzz/lynx'
import c from './constants'

export default async function request(country?: string): Promise<any> {
  if (!country) {
    const { json: res } = await fetch(c.baseURL + c.endpoint.all)
      .headers({
        'User-Agent': c.useragent
      })
      .send()

    return res
  }
  const { json: res } = await fetch(`${c.baseURL}${c.endpoint.country}/${country}`)
    .headers({
      'User-Agent': c.useragent
    })
    .send()

  return res
}
