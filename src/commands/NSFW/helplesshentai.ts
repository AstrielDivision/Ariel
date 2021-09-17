import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['hh'],
  description: 'Returns a Image from r/helplesshentai',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  nsfw: true
})
export default class HelplessHentai extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'helplesshentai', nsfw: true, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
