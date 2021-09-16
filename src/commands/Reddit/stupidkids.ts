import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  name: 'stupidkids',
  aliases: ['kidsarefuckingstupid'],
  description: 'Returns a Image from r/KidsAreFuckingStupid',
  nsfw: false
})
export default class KidsAreFuckingStupid extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'KidsAreFuckingStupid', nsfw: false, colour: 'ORANGE' }, Context, options)
  }
}
