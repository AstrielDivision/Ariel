import Tag from '#lib/Models/Tags'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { codeBlock } from '@sapphire/utilities'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['tag'],
  description: 'A custom command that stores text',
  detailedDescription: 'A tag is a custom command that stores text, when executed it returns with the text stored',
  usage: '[show | create | delete] <name> <data>',
  flags: ['embed'],
  options: ['color'],
  subCommands: ['create', 'delete', 'edit', 'source', { input: 'show', default: true }]
})
export default class Tags extends ArielCommand {
  public async show(message: Message) {
    const tags = await Tag.find({ guild_id: message.guild.id })

    const parsed = tags.map(t => t.name).join('\n')

    const embed = new MessageEmbed().setTitle(`${message.guild.name} | Tags`).setDescription(parsed)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async create(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value
    const data = (await args.restResult('string')).value
    const embed = args.getFlags('embed')
    const color = args.getOption('color')

    if (!name) return await message.channel.send('You must provide a name')
    if (!data) return await message.channel.send('You must provide data (Like a message)')

    await new Tag({
      guild_id: message.guild.id,
      name: name.toLowerCase(),
      data,
      embed,
      color
    }).save()

    return await message.channel.send(`Successfully add the tag \`${name}\``)
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async delete(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value

    if (!name) return await message.channel.send('You must provide a name')

    try {
      await Tag.findOneAndRemove({ name, guild_id: message.guild.id })
    } catch (err) {
      return await message.channel.send(`Could not find tag \`${name}\``)
    }

    return await message.channel.send(`Deleted \`${name}\``)
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async edit(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value
    const data = (await args.restResult('string')).value
    const embed = args.getFlags('embed')
    const color = args.getOption('color')

    if (!name) return await message.channel.send('You must provide a name of a tag')
    if (!data) return await message.channel.send('You must provide data to replace the old data')

    await Tag.findOneAndUpdate({ guild_id: message.guild.id, name }, { data, embed, color })

    return await message.channel.send(`Successfully updated \`${name}\``)
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async source(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value

    if (!name) return await message.channel.send('You must provide a name of a tag')

    const { data } = await Tag.findOne({ guild_id: message.guild.id, name })

    return await message.channel.send(codeBlock('md', data))
  }
}
