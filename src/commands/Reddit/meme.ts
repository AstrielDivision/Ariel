import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'meme',
  aliases: ['memes'],
  description: 'Returns a Image from r/memes',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Memes extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'memes', nsfw: false, colour: 'DARK_GREEN' }, Context, options)
  }
}
