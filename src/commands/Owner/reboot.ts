import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Restart the bot',
  preconditions: ['OwnerOnly']
})
export default class Reboot extends ArielCommand {
  public async messageRun(message: Message) {
    await message.channel.send('Rebooting!')

    process.exit()
  }
}
