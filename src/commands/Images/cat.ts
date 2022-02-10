import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Cat extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'cat' }, Context)
  }
}
