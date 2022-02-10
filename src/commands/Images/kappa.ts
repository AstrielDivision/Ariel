import KSoftCommand from '#lib/Structures/KSoftCommand'
import type { PieceContext } from '@sapphire/framework'

export default class Kappa extends KSoftCommand {
  constructor(Context: PieceContext) {
    super({ type: 'kappa' }, Context)
  }
}
