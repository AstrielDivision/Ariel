import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'helplesshentai',
  aliases: ['hh'],
  description: 'Returns a Image from r/helplesshentai',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  nsfw: true
})
export default class HelplessHentai extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'helplesshentai', nsfw: true, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}
