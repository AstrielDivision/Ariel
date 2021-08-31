import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'femboy',
  aliases: ['femboy', 'femboys', 'femboi', 'fembois'],
  description: 'Returns a Image from r/FemBoys',
  nsfw: true
})
export default class Femboy extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'femboys', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}
