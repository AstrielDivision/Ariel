import { srcDir } from '#lib/constants'
import { getSettings } from '#lib/database/functions'
import { envParseString } from '#lib/env/parser'
import { LogLevel } from '@sapphire/framework'
import type { InternationalizationContext } from '@sapphire/plugin-i18next'
import { ScheduledTaskRedisStrategy } from '@sapphire/plugin-scheduled-tasks/register-redis'
import { config } from 'dotenv-cra'
import type { FormatFunction } from 'i18next'
import { join } from 'path'
import Client from './lib/Ariel'

config({
  path: join(srcDir, '.env')
})

const client = new Client({
  defaultPrefix: envParseString('PREFIX'),
  regexPrefix: /^(hey +)?ariel[,! ]/i,
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { level: process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'],
  tasks: {
    strategy: new ScheduledTaskRedisStrategy({
      bull: {
        redis: {
          port: 6379,
          host: 'redis',
          password: 'redis',
          db: 1
        }
      }
    })
  },
  i18n: {
    fetchLanguage: async (message: InternationalizationContext) => {
      const { language } = await getSettings(message.guild.id)

      return language
    },
    i18next: (_: string[], languages: string[]) => ({
      supportLngs: languages,
      preload: languages,
      load: 'all',
      initImmediate: false,
      fallbackLng: 'en-US',
      returnObjects: true,
      returnEmptyString: false,
      returnNull: false,
      interpolation: {
        escapeValue: false,
        format: (...[value, format]: Parameters<FormatFunction>) => {
          switch (format) {
            case 'permissions': {
              return (value as string[]).map(v => `\`${v}\``).join(', ')
            }
            default:
              return value as string
          }
        }
      }
    })
  }
})

void client.start()
