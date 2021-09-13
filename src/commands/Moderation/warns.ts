import Warnings from '#lib/Models/Warnings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import { Message, MessageEmbed, User } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Fetch your warnings or another users warnings',
  usage: '<@user / userID> [warnID]'
})
export default class Warns extends ArielCommand {
  public async run(message: Message, args: Args) {
    const { user } = args.finished ? message.member : await args.pick('member')
    const ID = args.finished ? null : await args.pick('string')

    const embed = new MessageEmbed()

    if (ID) {
      const warn = await this.FetchWarn(user, message.guild.id, ID)

      if (!warn) return await message.channel.send('No warning with that ID exists.')

      const moderator = await this.container.client.util.findUser(warn.mod)

      embed.setTitle(`${user.id === message.author.id ? 'Your' : `${user.username}'s`} Warn`)

      embed.addField('Moderator', moderator.username, true)
      embed.addField('Reason', warn.reason, true)
      embed.setFooter(`Warn ID: ${warn.id}`)

      return await message.channel.send({ embeds: [embed] })
    }

    const { warnings, count } = await this.FetchWarnings(user, message.guild.id)
    embed.setTitle(`${user.id === message.author.id ? 'Your' : `${user.username}'s`} Warnings [${count ?? 0}]`)

    embed.addField(
      'Warnings',
      warnings
        ? warnings
          .map(w => `\`${w.id}\``)
          .join(', ')
          .toString()
        : 'This user doesn\'t have any warns.',
      true
    )

    return await message.channel.send({ embeds: [embed] })
  }

  private async FetchWarn(user: User, guild: string, id: string) {
    const warn = await Warnings.findOne({ user: user.id, guild, id })

    return warn
  }

  private async FetchWarnings(user: User, guild: string) {
    const warns = await Warnings.find({ user: user.id, guild })

    return {
      warnings: warns,
      count: warns.length
    }
  }
}
