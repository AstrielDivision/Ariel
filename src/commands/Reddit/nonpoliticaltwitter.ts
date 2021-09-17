import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['twitter'],
  description: 'Returns a Image from r/NonPoliticalTwitter',
  nsfw: false
})
export default class NonPoliticalTwitter extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'NonPoliticalTwitter', nsfw: false, colour: 'BLUE' }, Context, options)
  }
}
