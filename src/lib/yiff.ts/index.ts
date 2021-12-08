import type Client from '#lib/Structures/client'
import request from './request'

export default class {
  client: Client
  constructor(client: Client) {
    this.client = client
  }

  public async e621(tags: string, limit?: number) {
    const res = await request(this.client, {
      site: 'e621',
      limit: limit || 1,
      tags: tags
    })

    return res
  }

  public async floofy() {
    const res = await request(this.client, {
      site: 'floofy'
    })

    return res
  }
}
