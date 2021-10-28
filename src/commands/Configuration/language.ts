import GuildSettings from '#lib/Models/GuildSettings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set guild language',
  preconditions: ['Manager'],
  usage: '<en-US>'
})
export default class Language extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const lang = await args.pick('language')

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { language: lang } })

    return await message.channel.send(args.t('commands/config:language.success.set'))
  }
}
