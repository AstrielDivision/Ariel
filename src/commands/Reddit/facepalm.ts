import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'facepalm',
  aliases: ['fp'],
  description: 'Returns a Image from r/facepalm',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class FacePalm extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'facepalm', nsfw: false, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
