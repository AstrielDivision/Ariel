import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'meme',
  aliases: ['memes'],
  description: 'Returns a Image from r/memes',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Memes extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'memes', nsfw: false, colour: 'DARK_GREEN' }, Context, options)
  }
}
