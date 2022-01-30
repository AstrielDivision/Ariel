import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { TFunction } from '@sapphire/plugin-i18next'
import { Guild, Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/config:anti.description',
  usage: '<enable | disable | list: default> [unmentionable | invites, invite | gifts, gift]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends ArielCommand {
  public async list(message: Message, args: ArielCommand.Args) {
    return await this.defaultEmbed(message, args.t)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: ArielCommand.Args) {
    const setting = args.finished ? null : await args.pick('string')

    if (!setting) return await this.defaultEmbed(message, args.t)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
          return await message.channel.send(args.t('commands/config:anti.permissionErr', { perm: 'MANGE_NICKNAMES' }))
        }

        await this.container.prisma.guildSettings.update({
          where: {
            guildId: message.guild.id
          },
          data: {
            anti: {
              update: {
                unmentionable: true
              }
            }
          }
        })

        return await message.channel.send(args.t('commands/config:anti.enabled', { enabled: 'unmentionable names' }))
      }
      case 'invite':
      case 'invites': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send(args.t('commands/config:anti.permissionErr', { perm: 'MANGE_MESSAGES' }))
        }

        await this.container.prisma.guildSettings.update({
          where: {
            guildId: message.guild.id
          },
          data: {
            anti: {
              update: {
                invites: true
              }
            }
          }
        })

        return await message.channel.send(args.t('commands/config:anti.enabled', { enabled: 'discord invites' }))
      }
      case 'gift':
      case 'gifts': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send(args.t('commands/config:anti.permissionErr', { perm: 'MANGE_MESSAGES' }))
        }

        await this.container.prisma.guildSettings.update({
          where: {
            guildId: message.guild.id
          },
          data: {
            anti: {
              update: {
                unmentionable: true
              }
            }
          }
        })

        return await message.channel.send(args.t('commands/config:anti.enabled', { enabled: 'discord gifts' }))
      }
      default: {
        return await this.defaultEmbed(message, args.t)
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: ArielCommand.Args) {
    const setting = args.finished ? null : await args.pick('string')

    if (!setting) return await this.defaultEmbed(message, args.t)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        await this.container.prisma.guildSettings.update({
          where: {
            guildId: message.guild.id
          },
          data: {
            anti: {
              update: {
                unmentionable: false
              }
            }
          }
        })

        return await message.channel.send(args.t('commands/config:anti.disabled', { disabled: 'unmentionable names' }))
      }
      case 'invite':
      case 'invites': {
        await this.container.prisma.guildSettings.update({
          where: {
            guildId: message.guild.id
          },
          data: {
            anti: {
              update: {
                unmentionable: false
              }
            }
          }
        })

        return await message.channel.send(args.t('commands/config:anti.disabled', { disabled: 'discord invites' }))
      }
      case 'gift':
      case 'gifts': {
        await this.container.prisma.guildSettings.update({
          where: {
            guildId: message.guild.id
          },
          data: {
            anti: {
              update: {
                unmentionable: false
              }
            }
          }
        })

        return await message.channel.send(args.t('commands/config:anti.disabled', { disabled: 'discord gifts' }))
      }
      default: {
        return await this.defaultEmbed(message, args.t)
      }
    }
  }

  private async getPrefix(guild: Guild) {
    const { prefix } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: guild.id
      }
    })

    return prefix
  }

  private async defaultEmbed(message: Message, t: TFunction) {
    const prefix = await this.getPrefix(message.guild)
    const { anti } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: message.guild.id
      },
      select: {
        anti: true
      }
    })

    const embed = new MessageEmbed()
      .setTitle(`${t('commands/config:anti.title')} | ${message.guild.name}`)
      .setDescription(
        `${t('commands/config:anti.unmentionable', { yesNo: anti.unmentionable ? 'Yes' : 'No' })}\n` +
          `${t('commands/config:anti.filtering', { name: 'invites', yesNo: anti.invites ? 'Yes' : 'No' })}\n` +
          `${t('commands/config:anti.filtering', { name: 'gifts', yesNo: anti.gifts ? 'Yes' : 'No' })}`
      )
      .setFooter(t('commands/config:anti.disableFooter', { prefix }))

    return await message.channel.send({ embeds: [embed] })
  }
}
