import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'illustration',
  aliases: ['sketches', 'drawings'],
  description: 'Returns a Image from r/illustration',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Illustration extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'illustration', nsfw: false, colour: 'WHITE' }, Context, options)
  }
}
