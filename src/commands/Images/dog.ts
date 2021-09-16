import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import i18 from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['dog'],
  description: 'commands/images:dog.description',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Dog extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('dog', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle(i18.t('commands/images:dog.embed.title'))
      .setFooter(i18.t('commands/attributions:poweredByKSoft'))
      .setURL(url)
      .setColor('DARK_GREY')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
