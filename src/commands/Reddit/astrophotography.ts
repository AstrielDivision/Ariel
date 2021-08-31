import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'astrophotography',
  aliases: ['astronomy', 'astrophotography', 'astro'],
  description: 'Returns a Image from r/astrophotography',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Memes extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'astrophotography', nsfw: false, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
