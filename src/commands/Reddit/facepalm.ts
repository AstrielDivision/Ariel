import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  name: 'facepalm',
  aliases: ['fp'],
  description: 'Returns a Image from r/facepalm',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class FacePalm extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'facepalm', nsfw: false, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
