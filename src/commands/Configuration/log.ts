import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed, TextChannel } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set log channel for Moderation actions and Members joining and leaving',
  requiredUserPermissions: ['MANAGE_GUILD'],
  requiredClientPermissions: ['MANAGE_CHANNELS', 'MANAGE_WEBHOOKS'],
  flags: ['d', 'disable'],
  usage: '<moderation | members> <#channel>'
})
export default class Log extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const log = (await args.pickResult('string')).value
    const disableFlag = args.getFlags('d', 'disable')
    const channel = (await args.pickResult('guildTextChannel')).value

    switch (log ? log.toLowerCase() : '') {
      case 'moderation': {
        if (disableFlag) {
          return await this.deleteWebhook(message, 'moderation')
        } else {
          if (!channel) return await message.channel.send('Mention a channel to set the log channel to!')
          const webhook = await channel.createWebhook('Moderation Logs', {
            avatar: this.container.client.user.avatarURL({ dynamic: true })
          })

          await this.container.prisma.guildSettings.update({
            where: {
              guildId: message.guild.id
            },
            data: {
              modLog: {
                create: {
                  hook: webhook.id,
                  channel: channel.id
                }
              }
            }
          })

          return await message.channel.send(
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            `Logging Moderation Actions to ${channel.toString()}`
          )
        }
      }

      case 'members': {
        if (disableFlag) {
          return await this.deleteWebhook(message, 'members')
        } else {
          if (!channel) return await message.channel.send('Mention a channel to set the log channel to!')
          const webhook = await channel.createWebhook('Member Logs', {
            avatar: this.container.client.user.avatarURL({ dynamic: true })
          })

          await this.container.prisma.guildSettings.update({
            where: {
              guildId: message.guild.id
            },
            data: {
              memberLog: {
                create: {
                  hook: webhook.id,
                  channel: channel.id
                }
              }
            }
          })

          return await message.channel.send(
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            `Logging Members Join and Leave to ${channel.toString()}`
          )
        }
      }

      default: {
        const { modLog: mod } = await this.container.prisma.guildSettings.findUnique({
          where: {
            guildId: message.guild.id
          },
          select: {
            modLog: true
          }
        })

        const { memberLog: mem } = await this.container.prisma.guildSettings.findUnique({
          where: {
            guildId: message.guild.id
          },
          select: {
            memberLog: true
          }
        })

        let moderationLogs
        let membersLogs

        if (message.guild.channels.cache.has(mod?.channel)) {
          moderationLogs = message.guild.channels.cache.get(mod.channel)
        }
        if (message.guild.channels.cache.has(mem?.channel)) {
          membersLogs = message.guild.channels.cache.get(mem.channel)
        }

        /* eslint-disable @typescript-eslint/no-base-to-string */
        const embed = new MessageEmbed({
          color: 'YELLOW',
          description:
            `${
              membersLogs
                ? `Logging **members** Join and Leave in ${membersLogs.toString()}`
                : 'Not currently logging **members** Join and Leave.'
            }\n` +
            `${
              moderationLogs
                ? `Logging **moderation** actions in ${moderationLogs.toString()}`
                : 'Not currently logging **moderation** actions.'
            }`,
          timestamp: new Date(),
          author: {
            name: `Logs | ${message.guild.name}`,
            icon_url: message.guild.iconURL({ dynamic: true, format: 'png' })
          }
        })

        return await message.channel.send({ embeds: [embed] })
      }
    }
  }

  private async deleteWebhook(message: Message, type: 'moderation' | 'members') {
    let webhookID: string
    let channel: string

    if (type === 'moderation') {
      const { modLog: data } = await this.container.prisma.guildSettings.findUnique({
        where: {
          guildId: message.guild.id
        },
        select: {
          modLog: true
        }
      })

      webhookID = data.hook
      channel = data.channel
    } else {
      const { memberLog: data } = await this.container.prisma.guildSettings.findUnique({
        where: {
          guildId: message.guild.id
        },
        select: {
          memberLog: true
        }
      })

      webhookID = data.hook
      channel = data.channel
    }

    if (message.guild.channels.cache.has(channel)) {
      const hooks = await (message.guild.channels.cache.get(channel) as TextChannel).fetchWebhooks()
      if (hooks.has(webhookID)) hooks.delete(webhookID)
    }

    if (type === 'moderation') {
      await this.container.prisma.guildSettings.update({
        where: {
          guildId: message.guild.id
        },
        data: {
          modLog: null
        }
      })
    } else {
      await this.container.prisma.guildSettings.update({
        where: {
          guildId: message.guild.id
        },
        data: {
          memberLog: null
        }
      })
    }

    return await message.channel.send(`Disabled \`${type}\` logs`)
  }
}
