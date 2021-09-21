import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['hentai!'],
  description: 'Returns a Image from r/hentai',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class Hentai extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'hentai', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
