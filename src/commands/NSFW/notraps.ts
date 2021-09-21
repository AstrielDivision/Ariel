import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['trap'],
  description: 'Returns a Image from r/NoTraps',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class Femboy extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'NoTraps', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
