import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Returns a Image from r/bondage',
  nsfw: true
})
export default class Bondage extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'bondage', nsfw: true, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
