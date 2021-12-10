import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { randomBytes } from 'crypto'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Generates a random password',
  usage: '[length]'
})
export default class Password extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const length = args.finished ? 12 : await args.pick('number')

    if (length > 512) return await message.channel.send("You don't need a password that long!")

    const pwd = randomBytes(length).toString('base64')

    return await message.channel.send(pwd)
  }
}
