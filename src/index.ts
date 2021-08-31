import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'
import cfg from './config'

const client = new Client({
  defaultPrefix: cfg.prefix,
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { instance: new Logger('Ariel') },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS']
})

void client.start()
