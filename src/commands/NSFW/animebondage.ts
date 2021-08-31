import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { MessageEmbed, Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { FetchResultTypes } from '@sapphire/fetch'

@ApplyOptions<ArielCommandOptions>({
  name: 'animebondage',
  description: 'Returns bondage images',
  nsfw: true
})
export default class AnimeBondage extends ArielCommand {
  public async run(message: Message) {
    const res = await this.container.client.util.fetch<{ url: string }>(
      'https://shiro.gg/api/images/nsfw/bondage',
      FetchResultTypes.JSON
    )

    const embed = new MessageEmbed().setTitle(':smirk: Bondage').setImage(res.url).setURL(res.url)

    return await message.channel.send({
      embeds: [embed]
    })
  }
}
