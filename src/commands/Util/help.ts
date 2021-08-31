/**
 * Original: https://github.com/gitcord-project/Gitcord/blob/main/src/commands/Info/help.ts
 * Licensed under the MIT License.
 */
import { ApplyOptions } from '@sapphire/decorators'
import type { Args, Command } from '@sapphire/framework'
import { MessageEmbed, TextChannel, Message } from 'discord.js'
import cfg from '../../config'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'help',
  aliases: ['h'],
  description: 'Gives you a list of commands',
  detailedDescription: 'You may also provide a command, which will return info about that command',
  preconditions: ['GuildTextOnly'],
  usage: '[command]'
})
export default class Help extends ArielCommand {
  public async run(message: Message, args: Args) {
    const command = await args.pickResult('string')
    if (command.success) return await this.commandHelp(message, command.value)
    return await this.commands(message)
  }

  private async commandHelp(message: Message, cmd: string) {
    const commands = this.container.stores.get('commands')
    const command: Command = commands.get(cmd.toLowerCase())

    if (typeof command === 'undefined') {
      return await message.channel.send('Couldn\'t find that command!')
    }
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setFooter(
        `${message.author.tag} | Parameter Key: <> Required, [] Optional`,
        message.author.avatarURL({ dynamic: true })
      )
      .setTitle(`Command | ${command.name}`)
      .addField('Description', command.description)

    if (command.aliases.length > 0) {
      embed.addField('Aliases', command.aliases.join(', '))
    }

    if (command.detailedDescription) {
      embed.addField('Detailed Description', command.detailedDescription)
    }

    if ((command as ArielCommand).usage) {
      embed.addField('Usage', `${cfg.prefix}${(command as ArielCommand).usage}`)
    }

    return await message.channel.send({
      embeds: [embed]
    })
  }

  private async commands(message: Message) {
    let categories: string[] = []

    let embed = new MessageEmbed()

    // @ts-ignore
    // eslint-disable-next-line array-callback-return
    this.container.stores.get('commands').map((cmd: ArielCommand) => {
      // eslint-disable-next-line array-callback-return
      if (categories.includes(cmd.category)) return

      categories.push(cmd.category)
    })

    categories.forEach(category => {
      let commandsLine = ''
      this.container.stores.get('commands').forEach(cmd => {
        if ((cmd as ArielCommand).category !== category) return
        if (!this.container.client.util.isOwner(message.author.id) && (cmd as ArielCommand).category === 'Owner') {
          return
        }
        if (
          !(message.member.permissions.has('BAN_MEMBERS') || message.member.permissions.has('KICK_MEMBERS')) &&
          (cmd as ArielCommand).category === 'Moderation'
        ) {
          return
        }
        if (!(message.channel as TextChannel).nsfw && (cmd as ArielCommand).category === 'NSFW') return
        if (!(cmd as ArielCommand).enabled) return

        commandsLine += `\`${cmd.name}\` `
      })

      if (commandsLine.length < 1) return

      embed.addField(category, commandsLine)
      embed.setTimestamp()
      // embed.setThumbnail(message.author.avatarURL({ dynamic: true }))
      embed.setFooter(` - ${this.container.client.user.tag}`, this.container.client.user.avatarURL({ dynamic: true }))
    })
    return await message.channel.send({
      embeds: [embed]
    })
  }
}
