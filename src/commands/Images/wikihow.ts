import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { WikiHowImage } from '@aero/ksoft'

@ApplyOptions<ArielCommandOptions>({
  name: 'wikihow',
  aliases: ['how'],
  description: 'Returns a random wikihow article',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Wikihow extends ArielCommand {
  public async run(message: Message) {
    const { url, article }: WikiHowImage = await this.container.client.ksoft.images.wikihow()
    const embed = new MessageEmbed()
      .setTitle(article.title)
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('GREEN')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
