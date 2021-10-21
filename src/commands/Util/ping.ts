import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/misc:ping.description'
})
export default class Ping extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const ping = await message.channel.send(args.t('commands/misc:ping.pong'))

    return await ping.edit(
      args.t('commands/misc:ping.success', {
        ws: message.client.ws.ping,
        heartbeat: ping.createdTimestamp - message.createdTimestamp
      })
    )
  }
}
