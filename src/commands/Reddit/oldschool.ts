import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'oldschool',
  aliases: ['oldschoolocool'],
  description: 'Returns an image from r/oldschoolcool'
})
export default class OldSchool extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'oldschoolcool', nsfw: false, colour: 'GREY' }, Context, options)
  }
}
