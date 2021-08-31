import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'dankmeme',
  aliases: ['dankmemes'],
  description: 'Returns a Image from r/dankmemes',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class DankMemes extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'dankmemes', nsfw: false, colour: 'DARK_GREEN' }, Context, options)
  }
}
