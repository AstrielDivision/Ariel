import Warnings from '#lib/Models/Warnings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { Message, MessageEmbed, User } from 'discord.js'
import i18n, { TFunction } from 'i18next'
import { customAlphabet } from 'nanoid'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:warn.description',
  detailedDescription: 'Warn a user, remove a warn or pardon a user warn.',
  usage: '[pardon | remove] [@user / warnID] [reason]',
  subCommands: ['remove', 'pardon', { input: 'warn', default: true }]
})
export default class Warn extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async warn(message: Message, args: ArielCommand.Args) {
    const { user } = (await args.pickResult('member')).value
    const reason = (await args.pickResult('string')).value

    if (!user) return await message.channel.send(i18n.t('commands/moderation:warn.errors.noUser'))

    if (user.id === message.author.id) {
      return await message.channel.send(i18n.t('commands/moderation:warn.errors.selfWarn'))
    }
    if (user.id === this.container.client.id) {
      return await message.channel.send(i18n.t('commands/moderation:warn.errors.warnMe'))
    }

    return await this.CreateWarn(user, message, args.t, reason)
  }

  @RequiresUserPermissions('KICK_MEMBERS')
  public async remove(message: Message, args: ArielCommand.Args) {
    const warnID = (await args.pickResult('string')).value
    const member = args.finished ? null : await args.pick('member')

    if (!warnID) return await message.channel.send(args.t('commands/moderation:warn.errors.noID'))

    if (member?.user.id === message.author.id) {
      return await message.channel.send(args.t('commands/moderation:warn.errors.authorWarnRemove'))
    }
    if (member?.user.id === this.container.client.id) {
      return await message.channel.send(args.t('commands/moderation:warn.errors.removeMyWarns'))
    }

    return await this.RemoveWarn(message, warnID, args.t, member?.user)
  }

  @RequiresUserPermissions('KICK_MEMBERS')
  public async pardon(message: Message, args: ArielCommand.Args) {
    const warnID = (await args.pickResult('string')).value
    const member = args.finished ? null : await args.pick('member')

    if (!warnID) return await message.channel.send(args.t('commands/moderation:warn.errors.noID'))

    return await this.Pardon(message, warnID, args.t, member?.user)
  }

  private async Pardon(message: Message, ID: string, t: TFunction, user?: User) {
    let isPardoned: boolean

    if (user) {
      isPardoned = (await Warnings.findOne({ user: user.id, id: ID, guild: message.guild.id })).pardoned

      await Warnings.findOneAndUpdate(
        { user: user.id, id: ID, guild: message.guild.id },
        { $set: { pardoned: !isPardoned } }
      )

      return await message.channel.send(
        isPardoned
          ? t('commands/moderation:warn.unpardoned', { user: user.toString() })
          : t('commands/moderation:warn.pardoned', { user: user.toString() })
      )
    } else {
      isPardoned = (await Warnings.findOne({ id: ID, guild: message.guild.id })).pardoned

      const warning = await Warnings.findOneAndUpdate(
        { id: ID, guild: message.guild.id },
        { $set: { pardoned: !isPardoned } }
      )

      const member = await this.container.client.util.findUser(warning.user)

      return await message.channel.send(
        isPardoned
          ? i18n.t('commands/moderation:warn.unpardoned', { user: member.toString() })
          : i18n.t('commands/moderation:warn.pardoned', { user: member.toString() })
      )
    }
  }

  private async RemoveWarn(message: Message, ID: string, t: TFunction, user?: User) {
    if (user) {
      const warning = await Warnings.findOneAndRemove({ user: user.id, id: ID, guild: message.guild.id })

      if (!warning) return await message.channel.send(t('commands/moderation:warn.errors.404'))

      const member = await this.container.client.util.findUser(warning.user)

      return await message.channel.send(t('commands/moderation:warn.removed', { user: member.toString() }))
    } else {
      const warning = await Warnings.findOneAndRemove({ id: ID, guild: message.guild.id })

      if (!warning) return await message.channel.send(t('commands/moderation:warn.errors.404'))

      const member = await this.container.client.util.findUser(warning.user)

      return await message.channel.send(t('commands/moderation:warn.removed', { user: member.toString() }))
    }
  }

  private async CreateWarn(user: User, message: Message, t: TFunction, reason?: string) {
    const warning = await new Warnings({
      id: this.generateID(),
      user: user.id,
      mod: message.author.id,
      reason: reason,
      guild: message.guild.id
    }).save()

    const embed = new MessageEmbed()
      .setTitle(t('commands/moderation:warn.embed.title', { user: user.username, ID: warning.id }))
      .addField(t('commands/moderation:warn.embed.fieldNames.1'), message.author.username, true)
      .addField(t('commands/moderation:warn.embed.fieldNames.2'), warning.reason, true)

    return await message.channel.send({ embeds: [embed] })
  }

  private generateID() {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_/\\|!?#$.ä'
    const nano = customAlphabet(alphabet, 7)

    return nano()
  }
}
