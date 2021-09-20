import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['sketches', 'drawings'],
  description: 'Returns a Image from r/illustration',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Illustration extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'illustration', nsfw: false, colour: 'WHITE' }, Context, options)
  }
}
