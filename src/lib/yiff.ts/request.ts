import { envIsDefined, envParseString } from '#lib/env/parser'
import { request as fetch } from '@artiefuzzz/lynx'
import c from './constants'
import type { Config, FloofyResponse, Post } from './types'

export default async function request(options: Config): Promise<any> {
  switch (options.site) {
    case 'e621': {
      if (!options.tags) throw Error('No tags provided')
      const req = await fetch<{ posts: Post[] }>(
        `https://e621.net/posts.json?tags=limit:${options.limit} order:random -young ${options.tags}`
      )
        .agent(
          envIsDefined('E621_USER')
            ? `${c.defaults.useragent} User: ${envParseString('E621_USER')}`
            : `${c.defaults.useragent}`
        )
        .headers({
          authorization:
            envIsDefined('E621_USER') && envIsDefined('E621_API_KEY')
              ? `Basic ${Buffer.from(
                `${envParseString('E621_USER')}:${envParseString('E621_API_KEY')}`,
                'binary'
              ).toString('base64')}`
              : ''
        })
        .send()

      return req.json
    }
    case 'floofy': {
      const { json: res } = await fetch<FloofyResponse>('https://api.floofy.dev/yiff')
        .headers({
          'User-Agent': c.defaults.useragent
        })
        .send()
      return res
    }

    default: {
      throw Error('Available: e621 and floofy')
    }
  }
}
