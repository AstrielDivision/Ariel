import GuildSettings from '#lib/Models/GuildSettings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set guild language',
  usage: '<en-US | de-DE>'
})
export default class Language extends ArielCommand {
  @RequiresUserPermissions('MANAGE_GUILD')
  public async run(message: Message, args: ArielCommand.Args) {
    const lang = await args.pick('language')

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { language: lang } })

    return await message.channel.send(`Successfully set language to ${lang}`)
  }
}
