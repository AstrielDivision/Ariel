import Warnings from '#lib/Models/Warnings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set a warning reason',
  usage: '<WarningID> <reason>'
})
export default class Reason extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args) {
    const warnID = (await args.pickResult('string')).value
    const newVal = (await args.restResult('string')).value

    if (!warnID) return await message.channel.send('You must provide a warn ID. (Must be a valid one)')
    if (!newVal) return await message.channel.send('Please specify a new value for this field.')

    const warning = await Warnings.findOne({ id: warnID, guild: message.guild.id })

    if (!warning) return await message.channel.send('Could\'t find a warning with that ID.')

    if (!message.member.permissions.has('ADMINISTRATOR') && warning.user === message.author.id) {
      return await message.channel.send('You cannot set warn reasons for yourself.')
    }

    await warning.updateOne({ $set: { reason: newVal } })

    return await message.channel.send(`Successfully updated the reason to \`${newVal}\``)
  }
}
