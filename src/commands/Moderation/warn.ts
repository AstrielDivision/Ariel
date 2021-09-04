import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import Warnings from '#lib/Models/Warnings'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Warn a user',
  detailedDescription: 'Warn a user, remove a warn, set a field (reason only) or pardon a user\'s warn.',
  usage: '[remove | set | pardon] <@user / User ID> [reason]',
  subCommands: ['remove', 'set', 'pardon', { input: 'warn', default: true }]
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
    const user = (await args.pickResult('member')).value.user
    const warnID = (await args.pickResult('string')).value

    if (!user) return await message.channel.send('You must provide a user.')
    if (!warnID) return await message.channel.send('You must provide a warnID. (Must be a valid one)')

    if (user.id === message.author.id) return await message.channel.send('You cannot remove warns from yourself.')
    if (user.id === this.container.client.id) return await message.channel.send('I won\'t have any warns.')

    return await this.RemoveWarn(user, warnID, message)
  }

  @RequiresUserPermissions('KICK_MEMBERS')
  public async set(message: Message, args: Args) {
    const user = (await args.pickResult('member')).value.user
    const warnID = (await args.pickResult('string')).value
    const field = (await args.pickResult('string')).value
    const newVal = (await args.restResult('string')).value

    if (!warnID) return await message.channel.send('You must provide a warn ID. (Must be a valid one)')
    if (!field) return await message.channel.send('Please specify a field. (hint: You can only set the `reason`)')
    if (!newVal) return await message.channel.send('Please specify a new value for this field.')

    if (user.id === message.author.id) return await message.channel.send('You cannot set warn fields for yourself.')
    if (user.id === this.container.client.id) return await message.channel.send('I won\'t have any warns.')

    return await this.SetWarn(message, user ?? message.author, warnID, field, newVal)
  }

  @RequiresUserPermissions('KICK_MEMBERS')
  public async pardon(message: Message, args: Args) {
    const { user } = (await args.pickResult('member')).value
    const warnID = (await args.pickResult('string')).value

    if (!user.id) {
      return await message.channel.send('You must provide a user by mentioning them or by providing their user ID.')
    }
    if (!warnID) return await message.channel.send('You must provide a warn ID. (Must be a valid one)')

    return await this.Pardon(message, user, warnID)
  }

  private async Pardon(message: Message, user: User, ID: string) {
    const isPardoned = (await Warnings.findOne({ user: user.id, id: ID, guild: message.guild.id })).pardoned

    await Warnings.findOneAndUpdate(
      { user: user.id, id: ID, guild: message.guild.id },
      { $set: { pardoned: !isPardoned } }
    )

    return await message.channel.send(
      isPardoned ? `${user.toString()}'s case is no longer pardoned.` : `${user.toString()}'s case has been pardoned.`
    )
  }

  private async SetWarn(message: Message, user: User, ID: string, field?: string, newVal?: string) {
    switch (field) {
      case 'reason': {
        await Warnings.findOneAndUpdate({ user: user.id, id: ID, guild: message.guild.id }, { reason: newVal })

        return await message.channel.send(`Successfully updated the reason to \`${newVal}\``)
      }

      default: {
        return await message.channel.send(
          'You can only set the **reason**. Also your command should look like: `warn @user warnID reason new value here`'
        )
      }
    }
  }

  private async RemoveWarn(user: User, ID: string, message: Message) {
    await Warnings.findOneAndRemove({ user: user.id, id: ID, guild: message.guild.id }).catch(async () => {
      return await message.channel.send('This warning doesn\'t exist')
    })

    return await message.channel.send(`Successfully removed ${user.toString()}'s warning`)
  }

  private async CreateWarn(user: User, message: Message, reason?: string) {
    const warning = await new Warnings({
      id: this.container.client.util.randomString(5).toUpperCase(),
      user: user.id,
      mod: message.author.id,
      reason: reason,
      guild: message.guild.id
    }).save()

    const embed = new MessageEmbed()
      .setTitle(`Warned ${user.username}`)
      .addField('Moderator', message.author.username, true)
      .addField('Reason', warning.reason, true)
      .setFooter(`Warn ID: ${warning.id}`)

    return await message.channel.send({ embeds: [embed] })
  }
}
