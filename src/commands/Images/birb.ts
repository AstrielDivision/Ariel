import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import i18 from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['bird'],
  description: 'commands/images:birb.description',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class BirbCommand extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('birb', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setFooter(i18.t('commands/attributions:poweredByKSoft'))
      .setURL(url)
      .setColor('DARK_GREEN')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
