import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import Warnings from '#lib/Models/Warnings'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Warn a user',
  usage: '<@user / User ID> [reason]',
  subCommands: ['remove', { input: 'warn', default: true }]
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
