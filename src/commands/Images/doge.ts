import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import i18 from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['doge', 'wow'],
  description: 'commands/images:doge.description',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class DogeWow extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('doge', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle(i18.t('commands/images:doge.embed.title'))
      .setFooter(i18.t('commands/attributions:poweredByKSoft'))
      .setURL(url)
      .setColor('ORANGE')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
