import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'nonpoliticaltwitter',
  aliases: ['twitter'],
  description: 'Returns a Image from r/NonPoliticalTwitter',
  nsfw: false
})
export default class NonPoliticalTwitter extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'NonPoliticalTwitter', nsfw: false, colour: 'BLUE' }, Context, options)
  }
}
