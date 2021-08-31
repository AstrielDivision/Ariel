import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'stupidkids',
  aliases: ['kidsarefuckingstupid'],
  description: 'Returns a Image from r/KidsAreFuckingStupid',
  nsfw: false
})
export default class KidsAreFuckingStupid extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'KidsAreFuckingStupid', nsfw: false, colour: 'ORANGE' }, Context, options)
  }
}
