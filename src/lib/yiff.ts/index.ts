/* eslint-disable @typescript-eslint/no-explicit-any */
import type Client from '#lib/Structures/client'
import request from './request'

export default class {
  client: Client
  constructor(client: Client) {
    this.client = client
  }

  public async e621(tags: string, limit?: number): Promise<any> {
    const res = await request(this.client, {
      site: 'e621',
      limit: limit || 1,
      tags: tags
    }).catch((err: Error) => console.error(err))

    return res
  }

  public async floofy(): Promise<any> {
    const res = await request(this.client, {
      site: 'floofy'
    }).catch((err: Error) => console.error(err))

    return res
  }
}
