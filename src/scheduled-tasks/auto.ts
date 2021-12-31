import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks'
import { MessageEmbed, Snowflake, TextChannel } from 'discord.js'

export class Auto extends ScheduledTask {
  public async run({ channel, type, subreddit }: AutoPayload) {
    const _channel = this.container.client.channels.cache.find(c => c.id === channel) as TextChannel

    if (subreddit) {
      const { url, post } = await this.container.client.ksoft.images.reddit(subreddit, {
        removeNSFW: true,
        span: 'all'
      })

      const embed = new MessageEmbed()
        .setTitle(post.title)
        .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
        .setURL(post.link)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage(url)

      return await _channel.send({ embeds: [embed] })
    } else {
      // @ts-ignore
      const { url, post } = await this.container.client.ksoft.images[type]()

      const embed = new MessageEmbed()
        .setTitle(post.title)
        .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
        .setURL(post.link)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage(url)

      return await _channel.send({ embeds: [embed] })
    }
  }
}

interface AutoPayload {
  type: 'aww' | 'meme' | 'reddit'
  subreddit?: string
  channel: Snowflake
}
