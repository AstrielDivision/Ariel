import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Image } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'hentaigif',
  description: 'Returns an animated image of hentai',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class HentaiGif extends ArielCommand {
  public async run(message: Message) {
    const { url }: Image = await this.container.client.ksoft.images.random('hentai_gif', {
      nsfw: true
    })
    const embed = new MessageEmbed()
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('DARK_VIVID_PINK')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({
      embeds: [embed]
    })
  }
}
