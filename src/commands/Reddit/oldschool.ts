import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['oldschoolocool'],
  description: 'Returns an image from r/oldschoolcool'
})
export default class OldSchool extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'oldschoolcool', nsfw: false, colour: 'GREY' }, Context, options)
  }
}
