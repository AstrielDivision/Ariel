import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { FetchResultTypes } from '@sapphire/fetch'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'animebondage',
  description: 'Returns bondage images',
  nsfw: true
})
export default class AnimeBondage extends ArielCommand {
  public async messageRun(message: Message) {
    const res = await this.container.client.util.fetch<{ url: string }>(
      'https://shiro.gg/api/images/nsfw/bondage',
      FetchResultTypes.JSON
    )

    const embed = new MessageEmbed().setImage(res.url).setURL(res.url)

    return await message.channel.send({
      embeds: [embed]
    })
  }
}
