import TagCommand from '#lib/Models/TagCommand'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Solve this',
  usage: '[show | create | delete] <required>',
  subCommands: ['create', 'delete', { input: 'show', default: true }]
})
export default class Tags extends ArielCommand {
  public async show(message: Message) {
    const tags = await TagCommand.find({ guild_id: message.guild.id })

    const parsed = tags.map(t => t.name).join('\n')

    const embed = new MessageEmbed().setTitle(`${message.guild.name} | Tags`).setDescription(parsed)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async create(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value
    const data = (await args.restResult('string')).value

    if (!name) return await message.channel.send('You must provide a name')
    if (!data) return await message.channel.send('You must provide data (Like a message)')

    await new TagCommand({
      guild_id: message.guild.id,
      name: name.toLowerCase(),
      data
    }).save()

    return await message.channel.send(`Successfully add the tag \`${name}\``)
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async delete(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value

    if (!name) return await message.channel.send('You must provide a name')

    try {
      await TagCommand.findOneAndRemove({ name, guild_id: message.guild.id })
    } catch (err) {
      return await message.channel.send(`Could not find tag \`${name}\``)
    }

    return await message.channel.send(`Deleted \`${name}\``)
  }
}
