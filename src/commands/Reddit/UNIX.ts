import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['linux'],
  description: 'Returns a Image from r/UNIXPorn',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class UNIXPorn extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'UNIXPorn', nsfw: false, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
