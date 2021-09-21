import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'yiff',
  aliases: ['yiff', 'floofydev'],
  description: 'Returns an Image from api.floofy.dev',
  cooldownLimit: 6,
  nsfw: true,
  cooldownDelay: 5000
})
export default class YiffFloofyDev extends ArielCommand {
  public async run(message: Message) {
    const req: Request = await this.container.client.Yiff.floofy()

    const embed = new MessageEmbed().setImage(req.url).setColor('LUMINOUS_VIVID_PINK')

    return await message.channel.send({
      embeds: [embed]
    })
  }
}

interface Request {
  url: string
}
