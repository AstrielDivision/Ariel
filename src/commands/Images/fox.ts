import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<ArielCommandOptions>({
  name: 'fox',
  aliases: ['foxx'],
  description: 'Returns an image of a fox',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Fox extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('fox', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Foxx')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('ORANGE')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
