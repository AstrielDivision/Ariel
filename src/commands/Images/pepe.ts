import { envIsDefined } from '#lib/env/parser'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['pepe', 'frog'],
  description: 'commands/images:pepe.description',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  enabled: envIsDefined('KSOFT_TOKEN')
})
export default class Fox extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { url }: Image = await this.container.client.ksoft.images.random('pepe', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle(args.t('commands/images:pepe.embed.title'))
      .setFooter(args.t('attributions:poweredByKSoft'))
      .setURL(url)
      .setColor('DARK_GREEN')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
