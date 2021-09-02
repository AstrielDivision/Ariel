import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<ArielCommandOptions>({
  name: 'doge',
  aliases: ['doge', 'wow'],
  description: 'Returns an image of doge. Wow',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class DogeWow extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('doge', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Wow')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('ORANGE')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
