import { envIsDefined } from '#lib/env/parser'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/images:kappa.description',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  enabled: envIsDefined('KSOFT_TOKEN')
})
export default class Fox extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { url }: Image = await this.container.client.ksoft.images.random('kappa', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle(args.t('commands/images:kappa.embed.title'))
      .setFooter({ text: args.t('attributions:poweredByKSoft') })
      .setURL(url)
      .setColor('NOT_QUITE_BLACK')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
