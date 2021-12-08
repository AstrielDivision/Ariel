import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import type { Post } from '#lib/yiff.ts/types'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['621'],
  description: 'Returns an Image from e621 with your selected tags',
  detailedDescription:
    'Returns an Image from e621. Use --results=[number] or -r=[number] if you wish to have more than one image',
  cooldownLimit: 2,
  nsfw: true,
  cooldownDelay: 5000,
  options: ['results', 'r'],
  usage: '<tags> [--results=1 or -r=1]'
})
export default class E621 extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const Tags = (await args.restResult('string')).value
    const resOption = args.getOption('results', 'r')
    const res = parseInt(resOption)
    if (!Tags) return await message.channel.send('No tags were specified')
    if (res > 10) {
      return await message.channel.send('The amount of results is currently limited to 10')
    }

    const { posts }: { posts: Post[] } = await this.container.client.Yiff.e621(Tags, res)

    for await (let post of posts) {
      const embed = new MessageEmbed()
        .setTitle('Source')
        .setURL(`https://e621.net/posts/${post.id}`)
        .setImage(post.sample.url)
        .setFooter(
          `Artist(s): ${post.tags.artist.join(', ')} | Ups: ${post.score.up} | Downs ${
            post.score.down
          } | Total Score: ${post.score.total}`
        )
        .setColor('RANDOM')
      // if (re.tags.lore.length > 0) embed.setDescription(`Lore: ${re.tags.lore[0]}`)
      if (post.description) embed.setDescription(this.trimDescription(post.description))

      await message.channel.send({
        embeds: [embed]
      })
    }

    return undefined
  }

  private trimDescription(description: string, max = 4048): string {
    if (description.length < max) return description

    return description.slice(0, max)
  }
}
