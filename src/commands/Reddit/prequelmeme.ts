import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Returns a Image from r/prequelmemes',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class PrequelMemes extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'prequelmemes', nsfw: false, colour: 'BLUE' }, Context, options)
  }
}
