import { ArielOverlayCommand } from '#lib/Structures/CanvasCommand'
import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Add a rainbow overlay to your or someone elses profile picture',
  usage: '[@user]'
})
export default class Rainbow extends ArielOverlayCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ overlay: 'gay' }, Context, options)
  }
}
