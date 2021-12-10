import { envIsDefined } from '#lib/env/parser'
import type { RedditImage } from '@aero/ksoft'
import type { PieceContext } from '@sapphire/framework'
import { ColorResolvable, Message, MessageEmbed } from 'discord.js'
import { ArielCommand, ArielCommandOptions } from './Command'

export abstract class ArielRedditCommand extends ArielCommand {
  subreddit: string
  colour: ColorResolvable
  nsfw: boolean
  constructor(
    { subreddit, nsfw, colour }: { subreddit: string, nsfw: boolean, colour: ColorResolvable },
    Context: PieceContext,
    options: ArielCommandOptions
  ) {
    super(Context, options)
    this.subreddit = subreddit
    this.colour = colour
    this.nsfw = nsfw
    this.enabled = envIsDefined('KSOFT_TOKEN')
  }

  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { post, url }: RedditImage = await this.container.client.ksoft.images.reddit(this.subreddit, {
      removeNSFW: !this.nsfw,
      span: 'week'
    })
    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setFooter(args.t('attributions:poweredByKSoftReddit', { post }))
      .setURL(post.link)
      .setTimestamp()
      .setImage(url)
      .setColor(this.colour)
    return await message.channel.send({ embeds: [embed] })
  }
}
