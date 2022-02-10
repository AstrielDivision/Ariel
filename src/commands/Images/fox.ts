import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Fox extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'fox' }, Context)
  }
}
