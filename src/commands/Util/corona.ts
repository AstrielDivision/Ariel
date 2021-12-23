import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import CoronaFetch from '../../lib/corona-fetch/corona'

@ApplyOptions<ArielCommandOptions>({
  description: 'Get COVID-19 statistics worldwide or by country',
  usage: '[country]'
})
export default class Corona extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const country = (await args.pickResult('string')).value

    const embed = new MessageEmbed().setFooter('This data may not be accurate')

    if (country) {
      const res = await CoronaFetch.country(country)

      if (!res) return await message.channel.send('Country could not be found.')

      embed.setTitle(`${res.country} COVID-19 Stats`)
      embed.addFields([
        { name: 'Active Cases', value: `${res.active}`, inline: true },
        { name: 'Today Cases', value: `${res.todayCases}`, inline: true },
        { name: 'Deaths', value: `${res.deaths}`, inline: true },
        { name: 'Today Deaths', value: `${res.todayDeaths}`, inline: true },
        { name: 'Critical Cases', value: `${res.critical}`, inline: true }
      ])
      embed.setThumbnail(res.countryInfo.flag)

      return await message.channel.send({
        embeds: [embed]
      })
    }
    const res = await CoronaFetch.all()

    embed.setTitle('Global COVID-19 Stats')
    embed.addFields([
      { name: 'Active Cases', value: `${res.active}`, inline: true },
      { name: 'Today Cases', value: `${res.todayCases}`, inline: true },
      { name: 'Deaths', value: `${res.deaths}`, inline: true },
      { name: 'Today Deaths', value: `${res.todayDeaths}`, inline: true },
      { name: 'Critical Cases', value: `${res.critical}`, inline: true },
      { name: 'Affected Countries', value: `${res.affectedCountries}`, inline: true }
    ])

    return await message.channel.send({
      embeds: [embed]
    })
  }
}
