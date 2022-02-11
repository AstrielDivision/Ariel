import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Reddit extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ subreddit: 'dankmemes' }, Context)
  }
}
