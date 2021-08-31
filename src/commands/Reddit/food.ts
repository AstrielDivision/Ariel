import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'food',
  description: 'Returns a Image from r/foodporn',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class FoodPorn extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'foodporn', nsfw: false, colour: 'ORANGE' }, Context, options)
  }
}
