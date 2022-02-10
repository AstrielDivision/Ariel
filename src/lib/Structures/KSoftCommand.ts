import { envIsDefined } from '#lib/env/parser'
import type { Image, KSoftClient, RedditImage, WikiHowImage } from '@aero/ksoft'
import type { PieceContext } from '@sapphire/framework'
import type { Nullish } from '@sapphire/utilities'
import { Message, MessageEmbed } from 'discord.js'
import { ArielCommand } from './Command'

type Random = 'birb' | 'cat' | 'dog' | 'doge' | 'fox' | 'kappa' | 'pepe'
type Images = 'meme' | 'wikihow' | 'nsfw' | 'aww'

export default class KSoftCommand extends ArielCommand {
  public type: Random | Images
  public nsfw: boolean
  public subreddit?: string | Nullish
  private readonly ksoft: KSoftClient
  private readonly images = ['meme', 'wikihow', 'nsfw', 'aww']
  private image!: RedditImage | Image
  constructor(
    { type, nsfw, subreddit }: { type?: Random | Images, nsfw?: boolean, subreddit?: string },
    Context: PieceContext
  ) {
    super(Context, {
      requiredClientPermissions: ['EMBED_LINKS'],
      enabled: envIsDefined('KSOFT_TOKEN')
    })

    this.type = type
    this.options.nsfw = nsfw
    this.subreddit = subreddit ?? null
    this.ksoft = this.container.client.ksoft
  }

  public async messageRun(message: Message, args: ArielCommand.Args) {
    if (this.images.includes(this.type)) {
      this.image = await this.ksoft.images[this.type as Images](true)
    } else {
      this.image = this.subreddit
        ? await this.ksoft.images.reddit(this.subreddit, { removeNSFW: !this.nsfw, span: 'all' })
        : await this.ksoft.images.random(this.type, { nsfw: this.nsfw })
    }

    const embed = new MessageEmbed()

    if ((this.image as RedditImage).post) {
      const { post, url } = this.image as RedditImage

      embed
        .setTitle(post.title)
        .setFooter({ text: args.t('ksoft:poweredByKSoftReddit', { post }) })
        .setURL(post.link)
        .setImage(url)
    }
    if ((this.image as WikiHowImage).article) {
      const { article, url } = this.image as WikiHowImage

      embed
        .setTitle(article.title)
        .setURL(article.link)
        .setImage(url)
        .setFooter({ text: args.t('ksoft:poweredByKSoft') })
    }

    embed.setImage(this.image.url).setFooter({ text: args.t('ksoft:poweredByKSoft') })

    return await message.channel.send({ embeds: [embed] })
  }
}
