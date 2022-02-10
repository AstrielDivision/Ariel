import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Pepe extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'pepe' }, Context)
  }
}
