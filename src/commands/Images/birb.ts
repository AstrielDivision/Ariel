import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Birb extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'birb' }, Context)
  }
}
