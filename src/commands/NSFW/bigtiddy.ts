import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'bigtiddy',
  aliases: ['booba'],
  description: 'Returns a Image from r/bigtiddygothgf',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  nsfw: true
})
export default class Femboy extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'bigtiddygothgf', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
