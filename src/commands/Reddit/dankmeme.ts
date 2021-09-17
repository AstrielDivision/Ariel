import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
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
