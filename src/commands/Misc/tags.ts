import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { codeBlock } from '@sapphire/utilities'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['tag'],
  description: 'A custom command that stores text',
  detailedDescription: 'A tag is a custom command that stores text, when executed it returns with the text stored',
  usage: '[show | create | delete | source] [name] [data]',
  flags: ['embed'],
  options: ['color'],
  subCommands: ['create', 'delete', 'edit', 'source', { input: 'show', default: true }]
})
export default class Tags extends ArielCommand {
  public async show(message: Message) {
    const tags = await this.container.prisma.tag.findMany({
      where: {
        guildId: message.guild.id
      }
    })

    const parsed = tags.map(t => t.name).join('\n')

    const embed = new MessageEmbed().setTitle(`${message.guild.name} | Tags`).setDescription(parsed)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async create(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value
    const data = (await args.restResult('string')).value
    const embed = args.getFlags('embed')

    if (!name) return await message.channel.send('You must provide a name')
    if (!data) return await message.channel.send('You must provide data (Like a message)')
    // TODO: Check if the tag name already exists and return a message telling the user it exists already.

    await this.container.prisma.tag.updateMany({
      where: {
        guildId: message.guild.id,
        name
      },
      data: {
        name: name.toLowerCase(),
        data,
        embed
      }
    })

    return await message.channel.send(`Successfully add the tag \`${name}\``)
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async delete(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value

    if (!name) return await message.channel.send('You must provide a name')

    try {
      await this.container.prisma.tag.deleteMany({
        where: {
          guildId: message.guild.id,
          name
        }
      })
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
    // const color = args.getOption('color') ?? 'RANDOM'

    if (!name) return await message.channel.send('You must provide the name of a tag')
    if (!data) return await message.channel.send('You must provide data to replace the old data')

    await this.container.prisma.tag.updateMany({
      where: {
        guildId: message.guild.id,
        name
      },
      data: {
        data,
        embed
      }
    })

    return await message.channel.send(`Successfully updated \`${name}\``)
  }

  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async source(message: Message, args: ArielCommand.Args) {
    const name = (await args.pickResult('string')).value

    if (!name) return await message.channel.send('You must provide a name of a tag')

    const { data } = await this.container.prisma.tag.findFirst({
      where: {
        guildId: message.guild.id,
        name
      }
    })

    return await message.channel.send(codeBlock('md', data))
  }
}
