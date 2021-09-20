import { ArielOverlayCommand } from '#lib/Structures/CanvasCommand'
import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Add a GTA + Respect overlay to your or someone elses profile picture',
  usage: '[@user]'
})
export default class Passed extends ArielOverlayCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ overlay: 'passed' }, Context, options)
  }
}
