import { request as fetch } from '@artiefuzzz/lynx'
import c from './constants'

export default async function request(country?: string): Promise<any> {
  if (!country) {
    const { json: res } = await fetch(c.baseURL + c.endpoint.all)
      .agent(c.useragent)
      .send()

    return res
  }
  const { json: res } = await fetch(`${c.baseURL}${c.endpoint.country}/${country}`).agent(c.useragent).send()

  return res
}
