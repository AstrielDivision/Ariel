import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { RedditImage } from '@aero/ksoft'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'randnsfw',
  aliases: ['nsfw'],
  description: 'Returns a random nsfw image or gif from various subreddits',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class RandomNSFW extends ArielCommand {
  public async run(message: Message) {
    const { url, post }: RedditImage = await this.container.client.ksoft.images.nsfw(true)
    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
      .setURL(post.link)
      .setColor('WHITE')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({
      embeds: [embed]
    })
  }
}
