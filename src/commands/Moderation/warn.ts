import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import Warnings from '#lib/Models/Warnings'
import type { Args } from '@sapphire/framework'
import { customAlphabet } from 'nanoid'

@ApplyOptions<ArielCommandOptions>({
  description: 'Warn a user',
  detailedDescription: 'Warn a user, remove a warn, set a field (reason only) or pardon a user\'s warn.',
  usage: '[remove | pardon] <@user / User ID> [reason]',
  subCommands: ['remove', 'pardon', { input: 'warn', default: true }]
})
export default class Warn extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async warn(message: Message, args: Args) {
    const user = (await args.pickResult('member')).value.user
    const reason = (await args.pickResult('string')).value

    if (!user) return await message.channel.send('You must provide a user to warn.')

    if (user.id === message.author.id) return await message.channel.send('You cannot warn yourself.')
    if (user.id === this.container.client.id) return await message.channel.send('You cannot warn me.')

    return await this.CreateWarn(user, message, reason)
  }

  @RequiresUserPermissions('KICK_MEMBERS')
  public async remove(message: Message, args: Args) {
    const warnID = (await args.pickResult('string')).value
    const { user } = (await args.pickResult('member')).value

    if (!user) return await message.channel.send('You must provide a user.')
    if (!warnID) return await message.channel.send('You must provide a warnID. (Must be a valid one)')

    if (user.id === message.author.id) return await message.channel.send('You cannot remove warns from yourself.')
    if (user.id === this.container.client.id) return await message.channel.send('I won\'t have any warns.')

    return await this.RemoveWarn(message, warnID, user)
  }

  @RequiresUserPermissions('KICK_MEMBERS')
  public async pardon(message: Message, args: Args) {
    const warnID = (await args.pickResult('string')).value
    const { user } = (await args.pickResult('member')).value

    if (!warnID) return await message.channel.send('You must provide a warn ID. (Must be a valid one)')

    return await this.Pardon(message, warnID, user)
  }

  private async Pardon(message: Message, ID: string, user?: User) {
    let isPardoned: boolean

    if (user) {
      isPardoned = (await Warnings.findOne({ user: user.id, id: ID, guild: message.guild.id })).pardoned

      await Warnings.findOneAndUpdate(
        { user: user.id, id: ID, guild: message.guild.id },
        { $set: { pardoned: !isPardoned } }
      )

      return await message.channel.send(
        isPardoned ? `${user.toString()}'s case is no longer pardoned.` : `${user.toString()}'s case has been pardoned.`
      )
    } else {
      isPardoned = (await Warnings.findOne({ id: ID, guild: message.guild.id })).pardoned

      const warning = await Warnings.findOneAndUpdate(
        { id: ID, guild: message.guild.id },
        { $set: { pardoned: !isPardoned } }
      )

      user = await this.container.client.util.findUser(warning.id)

      return await message.channel.send(
        isPardoned ? `${user.toString()}'s case is no longer pardoned.` : `${user.toString()}'s case has been pardoned.`
      )
    }
  }

  private async RemoveWarn(message: Message, ID: string, user?: User) {
    if (user) {
      await Warnings.findOneAndRemove({ user: user.id, id: ID, guild: message.guild.id }).catch(async () => {
        return await message.channel.send('This warning doesn\'t exist')
      })

      return await message.channel.send(`Successfully removed ${user.toString()}'s warning`)
    } else {
      const warning = await Warnings.findOneAndRemove({ id: ID, guild: message.guild.id }).catch(async () => {
        return await message.channel.send('This warning doesn\'t exist')
      })

      user = await this.container.client.util.findUser(warning.id)

      return await message.channel.send(`Successfully removed ${user.toString()}'s warning`)
    }
  }

  private async CreateWarn(user: User, message: Message, reason?: string) {
    const warning = await new Warnings({
      id: this.generateID(),
      user: user.id,
      mod: message.author.id,
      reason: reason,
      guild: message.guild.id
    }).save()

    const embed = new MessageEmbed()
      .setTitle(`Warned ${user.username} | ${warning.id}`)
      .addField('Moderator', message.author.username, true)
      .addField('Reason', warning.reason, true)

    return await message.channel.send({ embeds: [embed] })
  }

  private generateID() {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_/\\|!?#$.ä'
    const nano = customAlphabet(alphabet, 7)

    return nano()
  }
}
