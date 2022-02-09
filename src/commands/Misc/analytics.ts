import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { request } from '@artiefuzzz/lynx'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageAttachment } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Solve this',
  usage: '[optional] <required>'
})
export default class example extends ArielCommand {
  public async messageRun(message: Message) {
    const image = await request('http://localhost:8286').send()
    const attachment = new MessageAttachment(image.buffer)

    return await message.channel.send({ files: [attachment] })
  }
}
