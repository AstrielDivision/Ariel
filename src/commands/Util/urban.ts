import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import Urban from '../../lib/UrbanFetch'

@ApplyOptions<ArielCommandOptions>({
  description: 'Get definitions of things on the trusty Urban Dictionary',
  nsfw: true,
  usage: '<word>'
})
export default class UrbanDictionary extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const search = (await args.pickResult('string')).value

    if (!search) return await message.channel.send('No search provided')

    const word = await Urban(search)
    const embed = new MessageEmbed()
      .setTitle(word.word)
      .setDescription(word.definition)
      .addField('Example', word.example)
      .setURL(word.permalink)
      .setFooter({
        text: `Author: ${word.author} | ID: ${word.defid} | Upvotes: ${word.thumbs_up} | Downvotes: ${word.thumbs_down}`
      })

    return await message.channel.send({
      embeds: [embed]
    })
  }
}
