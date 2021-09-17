import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['femboy', 'femboys', 'femboi', 'fembois'],
  description: 'Returns a Image from r/FemBoys',
  nsfw: true
})
export default class Femboy extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'femboys', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
