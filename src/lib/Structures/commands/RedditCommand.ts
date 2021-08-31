import type { RedditImage } from '@aero/ksoft'
import type { PieceContext } from '@sapphire/framework'
import { ColorResolvable, Message, MessageEmbed } from 'discord.js'
import { ArielCommand, AstraeaCommandOptions } from '../Command'

export abstract class AstraeaRedditCommand extends ArielCommand {
  subreddit: string
  colour: ColorResolvable
  nsfw: boolean
  constructor(
    { subreddit, nsfw, colour }: { subreddit: string, nsfw: boolean, colour: ColorResolvable },
    Context: PieceContext,
    options: AstraeaCommandOptions
  ) {
    super(Context, options)
    this.subreddit = subreddit
    this.colour = colour
    this.nsfw = nsfw
  }

  public async run(message: Message) {
    const { post, url }: RedditImage = await this.container.client.ksoft.images.reddit(this.subreddit, {
      removeNSFW: !this.nsfw,
      span: 'week'
    })
    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
      .setURL(post.link)
      .setTimestamp()
      .setImage(url)
      .setColor(this.colour)
    return await message.channel.send({ embeds: [embed] })
  }
}
