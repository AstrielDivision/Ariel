import { ArielCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { MessageEmbed, Message } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'ass',
  aliases: ['butt'],
  description: 'Returns a random Image of ASS',
  cooldownLimit: 3,
  cooldownDelay: 2000,
  nsfw: true
})
export default class Ass extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('ass', {
      nsfw: true
    })
    const embed = new MessageEmbed()
      .setTitle('Thicc?')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setTimestamp()
      .setImage(url)
      .setColor('DARK_BUT_NOT_BLACK')
    return await message.channel.send({
      embeds: [embed]
    })
  }
}
