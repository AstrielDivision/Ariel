import { readSettings, writeSettings } from '#lib/database/functions'
import { envParseString } from '#lib/env/parser'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Get, Set or Reset the prefix',
  usage: '[set | reset] [prefix]',
  subCommands: ['set', 'reset', { input: 'get', default: true }]
})
export default class Prefix extends ArielCommand {
  public async get({ guild: { id }, channel }: Message) {
    const { prefix } = await readSettings(id)

    return await channel.send(`This Guild's prefix is: **${prefix}**`)
  }

  public async set(message: Message, args: ArielCommand.Args) {
    const prefix = await args.pick('string')

    await writeSettings(message.guild.id, { prefix })

    return await message.channel.send('Updated the prefix!')
  }

  public async reset(message: Message) {
    await writeSettings(message.guild.id, { prefix: envParseString('PREFIX') })

    return await message.channel.send(`The prefix has been reset to: ${envParseString('PREFIX')}`)
  }
}
