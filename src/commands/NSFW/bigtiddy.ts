import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['booba'],
  description: 'Returns a Image from r/bigtiddygothgf',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  nsfw: true
})
export default class Femboy extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'bigtiddygothgf', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
