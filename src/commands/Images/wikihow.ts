import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Wikihow extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'wikihow' }, Context)
  }
}
