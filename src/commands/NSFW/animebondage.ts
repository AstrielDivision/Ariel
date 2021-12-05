import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { request } from '@artiefuzzz/lynx'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'animebondage',
  description: 'Returns bondage images',
  nsfw: true
})
export default class AnimeBondage extends ArielCommand {
  public async messageRun(message: Message) {
    const { json: res } = await request<{ url: string }>('https://shiro.gg/api/images/nsfw/bondage').send()

    const embed = new MessageEmbed().setImage(res.url).setURL(res.url)

    return await message.channel.send({
      embeds: [embed]
    })
  }
}
