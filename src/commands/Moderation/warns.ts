import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed, User } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:warns.description',
  usage: '<@user / userID> [warnID]'
})
export default class Warns extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { user } = args.finished ? message.member : await args.pick('member')
    const ID = args.finished ? null : await args.pick('nanoID')

    const embed = new MessageEmbed()

    if (ID) {
      const warn = await this.FetchWarn(user, message.guild.id, ID)

      if (!warn) return await message.channel.send(args.t('commands/moderation:warns.errors.404'))

      const moderator = await this.container.client.util.findUser(warn.mod)

      embed.setTitle(
        args.t('commands/moderation:warns.embed.title', {
          who: user.id === message.author.id ? 'Your' : `${user.username}'s`
        })
      )

      embed.addField(args.t('commands/moderation:warns.embed.fields.mod'), moderator.username, true)
      embed.addField(args.t('commands/moderation:warns.embed.fields.reason'), warn.reason, true)
      embed.setFooter({ text: args.t('commands/moderation:warns.embed.footer', { ID: warn.id }) })

      return await message.channel.send({ embeds: [embed] })
    }

    const { warnings, count } = await this.FetchWarnings(user, message.guild.id)
    embed.setTitle(
      args.t('commands/moderation:warns.embed2.title', {
        who: user.id === message.author.id ? 'Your' : `${user.username}'s`,
        count: count ?? 0
      })
    )

    embed.addField(
      args.t('commands/moderation:warns.embed2.fields.name'),
      warnings.length
        ? warnings
          .map(w => `\`${w.id}\``)
          .join(', ')
          .toString()
        : args.t('commands/moderation:warns.embed2.fields.noWarns'),
      true
    )

    return await message.channel.send({ embeds: [embed] })
  }

  private async FetchWarn({ id: user }: User, guildId: string, id: string) {
    const warn = await this.container.prisma.warning.findFirst({
      where: {
        id,
        guildId,
        user
      }
    })

    return warn
  }

  private async FetchWarnings(user: User, guildId: string) {
    const warns = await this.container.prisma.warning.findMany({
      where: {
        guildId,
        user: user.id
      }
    })

    return {
      warnings: warns,
      count: warns.length
    }
  }
}
