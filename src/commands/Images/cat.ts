import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<ArielCommandOptions>({
  name: 'cat',
  aliases: ['cat'],
  description: 'Returns an image of a cat',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Cat extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('cat', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Catt')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('WHITE')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
