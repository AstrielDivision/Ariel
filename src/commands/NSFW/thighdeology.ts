import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'thigh',
  aliases: ['thighs', 'thighdeology'],
  description: 'Returns a Image from r/thighdeology',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class Thighdeology extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'thighdeology', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
