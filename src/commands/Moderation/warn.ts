import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import Warnings from '#lib/Models/Warnings'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Warn a user',
  usage: '<@user / User ID> [reason]',
  subCommands: ['remove', 'clear', { input: 'warn', default: true }]
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
