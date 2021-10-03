/**
 * Original: https://github.com/gitcord-project/Gitcord/blob/main/src/commands/Info/help.ts
 * Licensed under the MIT License.
 */
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Command } from '@sapphire/framework'
import type { TFunction } from '@sapphire/plugin-i18next'
import { Message, MessageEmbed, TextChannel } from 'discord.js'
import cfg from '../../config'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['h'],
  description: 'commands/help:description',
  detailedDescription: 'commands/help:detailedDescription',
  preconditions: ['GuildTextOnly'],
  usage: '[command]'
})
export default class Help extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const command = await args.pickResult('string')
    if (command.success) return await this.commandHelp(message, command.value, args.t)

    return await this.commands(message, args.t)
  }

  private async commandHelp(message: Message, cmd: string, t: TFunction) {
    const commands = this.container.stores.get('commands')
    const command: Command = commands.get(cmd.toLowerCase())

    if (typeof command === 'undefined') {
      return await message.channel.send(t('commands/help:errors.404'))
    }
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setFooter(
        t('commands/help:embed1.footer', { author: message.author.tag }),
        message.author.avatarURL({ dynamic: true })
      )
      .setTitle(t('commands/help:embed1.title', { command }))
      .addField(t('commands/help:embed1.fields.1'), t(command.description))

    if (command.aliases.length > 0) {
      embed.addField(t('commands/help:embed1.fields.2'), command.aliases.join(', '))
    }

    if (command.detailedDescription) {
      embed.addField(t('commands/help:embed1.fields.3'), command.detailedDescription)
    }

    if ((command as ArielCommand).usage.length > 0) {
      embed.addField(t('commands/help:embed1.fields.4'), `${cfg.prefix}${(command as ArielCommand).usage}`)
    }

    return await message.channel.send({
      embeds: [embed]
    })
  }

  private async commands(message: Message, t: TFunction) {
    let categories: string[] = []

    let embed = new MessageEmbed().setTitle(t('commands/help:embed2.title'))

    // @ts-ignore
    this.container.stores.get('commands').map((cmd: ArielCommand) => {
      if (categories.includes(cmd.category)) return undefined

      return categories.push(cmd.category)
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
      embed.setFooter(` - ${this.container.client.user.tag}`, this.container.client.user.avatarURL({ dynamic: true }))
    })
    return await message.channel.send({
      embeds: [embed]
    })
  }
}
