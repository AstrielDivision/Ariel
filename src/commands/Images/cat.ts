import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['cat'],
  description: 'commands/images:cat.description',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Cat extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { url }: Image = await this.container.client.ksoft.images.random('cat', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle(args.t('commands/images:cat.embed.title'))
      .setFooter(args.t('attributions:poweredByKSoft'))
      .setURL(url)
      .setColor('WHITE')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}
