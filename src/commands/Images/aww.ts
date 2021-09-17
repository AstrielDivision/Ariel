import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['awww', 'awwww'],
  description: 'commands/images:awww.description',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Aww extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const { url }: Image = await this.container.client.ksoft.images.aww()
    const embed = new MessageEmbed()
      .setFooter(args.t('commands/attributions:poweredByKSoft'))
      .setTimestamp()
      .setImage(url)
      .setColor('AQUA')
    return await message.channel.send({ embeds: [embed] })
  }
}
