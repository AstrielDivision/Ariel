import { ArielCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { MessageEmbed, Message } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'aww',
  aliases: ['awww', 'awwww'],
  description: 'Returns a Image from r/astrophotography',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Aww extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.aww()
    const embed = new MessageEmbed().setFooter('Powered by api.ksoft.si').setTimestamp().setImage(url).setColor('AQUA')
    return await message.channel.send({ embeds: [embed] })
  }
}
