import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'prequelmemes',
  description: 'Returns a Image from r/prequelmemes',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class PrequelMemes extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'prequelmemes', nsfw: false, colour: 'BLUE' }, Context, options)
  }
}
