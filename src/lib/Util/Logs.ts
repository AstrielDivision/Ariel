import dayjs from 'dayjs'
import { Guild, MessageEmbed, TextChannel } from 'discord.js'
import GuildSettings from '../Models/GuildSettings'
import type { LogData } from '../Types/Logs'

function createLogEmbed(type: 'members' | 'moderation', data: LogData) {
  if (type === 'moderation') {
    return data.action === 'ban'
      ? new MessageEmbed({
        title: 'Member Banned',
        color: 'RED',
        description:
            `┏ **Banned User:** ${data.member.user.tag ?? data.user.tag}\n` +
            `┣ **Banned User ID:** ${data.member.id ?? data.user.id}\n` +
            `┣ **Issued By:** ${data.issuer ?? 'Unknown'}\n` +
            `┗ **Reason:** ${data.reason ?? 'Not Specified'}`,
        timestamp: new Date()
      })
      : new MessageEmbed({
        title: 'Member Kicked',
        color: 'YELLOW',
        description:
            `┏ **Kicked User:** ${data.member.user.tag}\n` +
            `┣  **Kicked User ID: :** ${data.member.id}\n` +
            `┣  **Issued By:** ${data.issuer ?? 'Unknown'}\n` +
            `┗  **Reason:** ${data.reason ?? 'Not Specified'}`
      })
  }
  if (type === 'members') {
    return data.action === 'join'
      ? new MessageEmbed({
        title: 'Member Joined',
        color: 'BLURPLE',
        description:
            `┏ **User:** ${data.member.user.tag}\n` +
            `┣ **ID:** ${data.member.id}\n` +
            `┗ **Account Created At:** <t:${dayjs(data.member.user.createdTimestamp).unix()}:D>`,
        timestamp: new Date()
      })
      : new MessageEmbed({
        title: 'Member Left',
        color: 'BLURPLE',
        description:
            `┏ **User:** ${data.member.user.tag}\n` +
            `┣ **ID:** ${data.member.id}\n` +
            `┣ **Join Date:** <t:${dayjs(data.member.joinedTimestamp).unix()}:D> \n` +
            `┗ **Account Created At:** <t:${dayjs(data.member.user.createdTimestamp).unix()}:D>`,
        timestamp: new Date()
      })
  }

  throw Error('There are 2 types available: moderation and members. Please choose one')
}

async function sendToLogs(guild: Guild, type: 'moderation' | 'members', embed: MessageEmbed) {
  const { logs } = await GuildSettings.findOne({ guild_id: guild.id })

  if (!logs) return false

  const webhookId = logs[type].hook
  const channelId = logs[type].channel

  if (guild.channels.cache.has(channelId)) {
    const hooks = await (guild.channels.cache.get(channelId) as TextChannel).fetchWebhooks()
    if (hooks.has(webhookId)) await hooks.get(webhookId).send({ embeds: [embed] })
  }

  return true
}

export function logAction(type: 'moderation' | 'members', data: LogData, guild: Guild): boolean {
  return void sendToLogs(guild, type, createLogEmbed(type, data))
}
