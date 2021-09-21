import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Returns an image from r/blessedimages',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Memes extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'blessedimages', nsfw: false, colour: 'WHITE' }, Context, options)
  }
}
