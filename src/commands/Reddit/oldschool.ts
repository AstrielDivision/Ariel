import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'oldschool',
  aliases: ['oldschoolocool'],
  description: 'Returns an image from r/oldschoolcool'
})
export default class OldSchool extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'oldschoolcool', nsfw: false, colour: 'GREY' }, Context, options)
  }
}
