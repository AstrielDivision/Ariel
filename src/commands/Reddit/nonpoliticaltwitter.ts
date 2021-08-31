import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'nonpoliticaltwitter',
  aliases: ['twitter'],
  description: 'Returns a Image from r/NonPoliticalTwitter',
  nsfw: false
})
export default class NonPoliticalTwitter extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'NonPoliticalTwitter', nsfw: false, colour: 'BLUE' }, Context, options)
  }
}
