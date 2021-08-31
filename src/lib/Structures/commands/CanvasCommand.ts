import type { Args, PieceContext } from '@sapphire/framework'
import { Message, MessageAttachment } from 'discord.js'
import canvas from '../../Canvas-SRA/requests'
import { ArielCommand, ArielCommandOptions } from '../Command'

export abstract class ArielOverlayCommand extends ArielCommand {
  overlay: 'gay' | 'glass' | 'wasted' | 'passed' | 'jail' | 'comrade' | 'triggered'
  constructor(
    { overlay }: { overlay: 'gay' | 'glass' | 'wasted' | 'passed' | 'jail' | 'comrade' | 'triggered' },
    Context: PieceContext,
    options: ArielCommandOptions
  ) {
    super(Context, options)
    this.overlay = overlay
  }

  public async run(message: Message, args: Args) {
    let buffer: Buffer
    const mention = (await args.pickResult('user')).value

    const wait = await message.channel.send('Please wait...')

    if (mention) {
      buffer = await canvas(this.overlay, mention.avatarURL({ format: 'png', size: 256 }))

      const image = new MessageAttachment(buffer, 'img.png')

      await message.channel.send({ files: [image] })
      return await wait.delete()
    }

    buffer = await canvas(this.overlay, message.member?.user.displayAvatarURL({ format: 'png', size: 256 }))

    const image = new MessageAttachment(buffer, 'img.png')

    await message.channel.send({ files: [image] })
    return await wait.delete()
  }
}
