import GuildSettings from '#lib/Models/GuildSettings'
import type { InternationalizationContext } from '@sapphire/plugin-i18next'
import type { Message } from 'discord.js'
import cfg from './config'
import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'

const client = new Client({
  defaultPrefix: cfg.prefix,
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { instance: new Logger('Ariel') },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'],
  fetchPrefix: async (message: Message) => {
    const { prefix } = await GuildSettings.findOne({ guild_id: message.guild.id })

    return prefix ?? cfg.prefix
  },
  i18n: {
    fetchLanguage: async (message: InternationalizationContext) => {
      const { language } = await GuildSettings.findOne({ guild_id: message.guild.id })

      return language
    }
  },
  api: {
    listenOptions: {
      port: 4000
    },
    prefix: '/v1/'
  }
})

void client.start()
