import request from './request'

export default class {
  public async e621(tags: string, limit?: number) {
    const res = await request({
      site: 'e621',
      limit: limit || 1,
      tags: tags
    })

    return res
  }

  public async floofy() {
    const res = await request({
      site: 'floofy'
    })

    return res
  }
}
