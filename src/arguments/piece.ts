import { LanguageKeys } from '#languages'
import { Argument, ArgumentContext, Piece } from '@sapphire/framework'

export default class PieceArgument extends Argument<Piece> {
  public run(parameter: string, context: ArgumentContext) {
    for (const store of this.container.stores.values()) {
      const piece = store.get(parameter)
      if (piece) return this.ok(piece)
    }

    return this.error({ parameter, context, identifier: LanguageKeys.Arguments.Piece })
  }
}
