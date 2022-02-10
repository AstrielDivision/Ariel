import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Dog extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'dog' }, Context)
  }
}
