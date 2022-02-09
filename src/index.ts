import { srcDir } from '#lib/constants'
import { envParseString } from '#lib/env/parser'
import { LogLevel } from '@sapphire/framework'
import { ScheduledTaskRedisStrategy } from '@sapphire/plugin-scheduled-tasks/register-redis'
import { config } from 'dotenv-cra'
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
  }
})

void client.start()
