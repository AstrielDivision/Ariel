import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Doge extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'doge' }, Context)
  }
}
