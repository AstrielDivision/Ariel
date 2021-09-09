import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'reboot',
  description: 'Restart the bot',
  preconditions: ['OwnerOnly']
})
export default class Reboot extends ArielCommand {
  public async run(message: Message) {
    await message.channel.send('Rebooting!')

    process.exit()
  }
}
