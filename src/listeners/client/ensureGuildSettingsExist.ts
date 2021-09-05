import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import GuildModel from '#lib/Models/GuildSettings'
import type { Message } from 'discord.js'

const cached: string[] = []

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class ensureGuildSettingsExist extends Listener {
  public async run(message: Message): Promise<undefined> {
    if (cached.includes(message.guild.id)) return undefined

    const guild = await GuildModel.findOne({ guild_id: message.guild.id })

    if (!guild) {
      await new GuildModel({
        guild_id: message.guild.id
      }).save()
    }

    cached.push(message.guild.id)

    return undefined
  }
}
