import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['dankmemes'],
  description: 'Returns a Image from r/dankmemes',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class DankMemes extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'dankmemes', nsfw: false, colour: 'DARK_GREEN' }, Context, options)
  }
}
