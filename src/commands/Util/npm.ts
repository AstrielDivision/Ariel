import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { request as fetch } from '@artiefuzzz/lynx'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Search an NPM package on the NPM registry',
  usage: '<package name>'
})
export default class NPM extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const packageName = (await args.pickResult('string')).value

    if (!packageName) return await message.channel.send('No package name provided')

    const { json: req } = await fetch<NPMResponse>(`https://registry.npmjs.org/${packageName}`).send()

    const embed = new MessageEmbed()
      .setTitle(`${req.name}@${req['dist-tags'].latest}`)
      .setURL(`https://www.npmjs.com/package/${req._id}`)
      // .setAuthor('NPM Package Information', 'https://i.imgur.com/8DKwbhj.png')
      .setAuthor('NPM Package Information')
      .setThumbnail(
        'https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png'
      )
      .addFields(
        { name: 'License', value: `${req.license || 'None'}`, inline: true },
        { name: 'Author', value: `${req.author.name}`, inline: true },
        { name: 'Maintainer(s)', value: `${req.maintainers.map(M => M.name).join(', ')}`, inline: true },
        { name: 'Keywords', value: `${req.keywords.join(', ')}`, inline: true }
      )
      .setImage(`https://nodei.co/npm/${req.name}.png?downloads=true&compact=true`)
      .setTimestamp()

    return await message.channel.send({ embeds: [embed] })
  }
}

interface NPMResponse {
  _id: string
  _rev: string
  name: string
  'dist-tags': Record<string, string>
  maintainers: Array<Record<string, string>>
  description: string
  homepage: string
  author: {
    name: string
  }
  license: string
  keywords: string[]
}
