import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
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
