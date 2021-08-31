import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'bondage',
  description: 'Returns a Image from r/bondage',
  nsfw: true
})
export default class Bondage extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'bondage', nsfw: true, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
