import { envIsDefined } from '#lib/env/parser'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import type { WikiHowImage } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['how'],
  description: 'commands/images:wikihow.description',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  enabled: envIsDefined('KSOFT_TOKEN')
})
export default class Wikihow extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { url, article }: WikiHowImage = await this.container.client.ksoft.images.wikihow()
    const embed = new MessageEmbed()
      .setTitle(article.title)
      .setFooter(args.t('attributions:poweredByKSoft'))
      .setURL(url)
      .setColor('GREEN')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
