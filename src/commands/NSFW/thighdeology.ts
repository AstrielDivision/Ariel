import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  name: 'thigh',
  aliases: ['thighs', 'thighdeology'],
  description: 'Returns a Image from r/thighdeology',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class Thighdeology extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'thighdeology', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
