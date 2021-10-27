import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['butt'],
  description: 'Returns a random Image of ASS',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  nsfw: true
})
export default class Ass extends ArielCommand {
  public async messageRun(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('ass', {
      nsfw: true
    })
    const embed = new MessageEmbed()
      .setTitle('Thicc?')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setTimestamp()
      .setImage(url)
      .setColor('DARK_BUT_NOT_BLACK')
    return await message.channel.send({
      embeds: [embed]
    })
  }
}
