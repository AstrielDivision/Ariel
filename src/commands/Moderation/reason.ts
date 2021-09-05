import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import Warnings from '#lib/Models/Warnings'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set a warning reason',
  usage: '<@user / ID> <WarningID> <reason>'
})
export default class Reason extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args) {
    const user = (await args.pickResult('member')).value.user
    const warnID = (await args.pickResult('string')).value
    const newVal = (await args.restResult('string')).value

    if (!warnID) return await message.channel.send('You must provide a warn ID. (Must be a valid one)')
    if (!newVal) return await message.channel.send('Please specify a new value for this field.')

    if (user.id === message.author.id) return await message.channel.send('You cannot set warning reasons for yourself.')
    if (user.id === this.container.client.id) return await message.channel.send('I won\'t have any warns.')

    await Warnings.findOneAndUpdate(
      { user: user.id, id: warnID, guild: message.guild.id },
      { $set: { reason: newVal } }
    )

    return await message.channel.send(`Successfully updated the reason to \`${newVal}\``)
  }
}
