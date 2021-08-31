import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'beans',
  description: 'Returns a Image from r/BeansInStrangePlaces',
  nsfw: false
})
export default class BeansInStrangePlaces extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'BeansInStrangePlaces', nsfw: false, colour: 'DARK_ORANGE' }, Context, options)
  }
}
