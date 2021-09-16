import Warnings from '#lib/Models/Warnings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import { Message, MessageEmbed, User } from 'discord.js'
import i18n from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:warns.description',
  usage: '<@user / userID> [warnID]'
})
export default class Warns extends ArielCommand {
  public async run(message: Message, args: Args) {
    const { user } = args.finished ? message.member : await args.pick('member')
    const ID = args.finished ? null : await args.pick('string')

    const embed = new MessageEmbed()

    if (ID) {
      const warn = await this.FetchWarn(user, message.guild.id, ID)

      if (!warn) return await message.channel.send(i18n.t('commands/moderation:warns.errors.404'))

      const moderator = await this.container.client.util.findUser(warn.mod)

      embed.setTitle(
        i18n.t('commands/moderation:warns.embed.title', {
          who: user.id === message.author.id ? 'Your' : `${user.username}'s`
        })
      )

      embed.addField(i18n.t('commands/moderation:warns.embed.fields.mod'), moderator.username, true)
      embed.addField(i18n.t('commands/moderation:warns.embed.fields.reason'), warn.reason, true)
      embed.setFooter(i18n.t('commands/moderation:warns.embed.footer', { ID: warn.id }))

      return await message.channel.send({ embeds: [embed] })
    }

    const { warnings, count } = await this.FetchWarnings(user, message.guild.id)
    embed.setTitle(
      i18n.t('commands/moderation:warns.embed2.title', {
        who: user.id === message.author.id ? 'Your' : `${user.username}'s`,
        count: count ?? 0
      })
    )

    embed.addField(
      i18n.t('commands/moderation:warns.embed2.fields.name'),
      warnings.length
        ? warnings
          .map(w => `\`${w.id}\``)
          .join(', ')
          .toString()
        : i18n.t('commands/moderation:warns.embed2.fields.noWarns'),
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
