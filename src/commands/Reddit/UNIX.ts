import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'unix',
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
