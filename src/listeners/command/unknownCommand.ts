import Tag from '#lib/Models/Tags'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions, UnknownCommandPayload } from '@sapphire/framework'
import { Message, MessageEmbed, Snowflake } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.UnknownCommand
})
export default class unknownCommand extends Listener {
  public async run({ message, commandName }: UnknownCommandPayload): Promise<unknown> {
    if (!message.guild) return null

    const tags = await Tag.find({ guild: message.guild.id })

    if (tags.length === 0) return null

    const name = commandName.toLowerCase()

    if (!(await this.tagExists(message.guild.id, name))) return null

    return await this.runCommand(message, name)
  }

  private async runCommand(message: Message, name: string) {
    const { name: tagName, data, embed: isEmbed, color } = await Tag.findOne({ guild_id: message.guild.id, name })

    if (tagName !== name) return null

    if (isEmbed) {
      const embed = new MessageEmbed({
        description: data,
        color
      })
      return await message.channel.send({ embeds: [embed] })
    } else {
      return await message.channel.send(data)
    }
  }

  private async tagExists(guild_id: Snowflake, name: string) {
    return await Tag.exists({ guild_id, name })
  }
}
