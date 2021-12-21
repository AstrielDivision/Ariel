import TagCommand from '#lib/Models/TagCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions, UnknownCommandPayload } from '@sapphire/framework'
import type { Message, Snowflake } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.UnknownCommand
})
export default class unknownCommand extends Listener {
  public async run({ message, commandName }: UnknownCommandPayload): Promise<unknown> {
    if (!message.guild) return null

    const tags = await TagCommand.find({ guild: message.guild.id })

    if (tags.length === 0) return null

    const name = commandName.toLowerCase()

    if (!(await this.tagExists(message.guild.id, name))) return null

    return await this.runCommand(message, name)
  }

  private async runCommand(message: Message, name: string) {
    const tag = await TagCommand.findOne({ guild_id: message.guild.id, name })

    if (tag.name !== name) return null

    return await message.channel.send(tag.data)
  }

  private async tagExists(guild_id: Snowflake, name: string) {
    return await TagCommand.exists({ guild_id, name })
  }
}
