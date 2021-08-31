import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { MessageEmbed, Message } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<ArielCommandOptions>({
  name: 'pepe',
  aliases: ['pepe', 'frog'],
  description: 'Returns an image of Pepe the frog',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Fox extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('pepe', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Pepe the Frog')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('DARK_GREEN')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
