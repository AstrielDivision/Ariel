import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'
import type { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaOverlayCommand } from '#lib/Structures/commands/CanvasCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'rainbow',
  description: 'Add a rainbow overlay to your or someone elses profile picture',
  usage: '[@user]'
})
export default class Rainbow extends AstraeaOverlayCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ overlay: 'gay' }, Context, options)
  }
}
