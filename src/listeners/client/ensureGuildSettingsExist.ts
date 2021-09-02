import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import GuildModel from '#lib/Models/GuildSettings'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class ensureGuildSettingsExist extends Listener {
  public async run(message: Message): Promise<unknown> {
    const guild = await GuildModel.findOne({ guild_id: message.guild.id })

    if (!guild) {
      await new GuildModel({
        guild_id: message.guild.id
      }).save()
    }

    return null
  }
}
