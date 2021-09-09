import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { editLocalized, sendLocalized } from '@sapphire/plugin-i18next'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'ping',
  description: 'commands/ping:description'
})
export default class Ping extends ArielCommand {
  public async run(message: Message) {
    const ping = await sendLocalized(message, 'commands/ping:pong')

    const ws = this.container.client.ws.ping
    const heartbeat = ping.createdTimestamp - message.createdTimestamp

    return await editLocalized(ping, { keys: 'commands/ping:success', formatOptions: { ws, heartbeat } })
  }
}
