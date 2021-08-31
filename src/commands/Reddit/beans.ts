import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'beans',
  description: 'Returns a Image from r/BeansInStrangePlaces',
  nsfw: false
})
export default class BeansInStrangePlaces extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'BeansInStrangePlaces', nsfw: false, colour: 'DARK_ORANGE' }, Context, options)
  }
}
