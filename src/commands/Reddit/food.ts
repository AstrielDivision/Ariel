import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ArielRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'food',
  description: 'Returns a Image from r/foodporn',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class FoodPorn extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'foodporn', nsfw: false, colour: 'ORANGE' }, Context, options)
  }
}
