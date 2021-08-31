import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

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
