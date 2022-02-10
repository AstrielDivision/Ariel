import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Meme extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'meme' }, Context)
  }
}
