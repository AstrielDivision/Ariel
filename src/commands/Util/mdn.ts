import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { request as fetch } from '@artiefuzzz/lynx'
import { ApplyOptions } from '@sapphire/decorators'
import { ColorResolvable, Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Find something on the MDN Docs',
  usage: '<query>'
})
export default class MDN extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const query = (await args.pickResult('string')).value

    if (!query) return await message.channel.send('I cannot search for nothing in the MDN Docs!')

    const { json: data } = await fetch<MDNResponse>(`https://mdn.gideonbot.com/embed?q=${query}`).send()

    const embed = new MessageEmbed(data)

    return await message.channel.send({ embeds: [embed] })
  }
}

interface MDNResponse {
  color: ColorResolvable
  title: string
  url: string
  author: {
    name: string
  }
  icon_url: {
    url: string
  }
  description: string
}
