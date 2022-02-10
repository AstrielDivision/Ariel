import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class PrequelMeme extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ subreddit: 'prequelmemes' }, Context)
  }
}
