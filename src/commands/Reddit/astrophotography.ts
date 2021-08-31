import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'astrophotography',
  aliases: ['astronomy', 'astrophotography', 'astro'],
  description: 'Returns a Image from r/astrophotography',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Memes extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'astrophotography', nsfw: false, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
