import { DurationFormatter } from '@sapphire/time-utilities'
import type { Guild, Snowflake, User } from 'discord.js'
import type Client from './Structures/client'

export default class Utils {
  client!: Client
  constructor(client: Client) {
    this.client = client
  }

  public async findUser(id: string | Snowflake): Promise<User | undefined> {
    return await this.client.users.resolve(id)?.fetch()
  }

  public async findGuild(id: string | Snowflake): Promise<Guild | undefined> {
    return await this.client.guilds.resolve(id)?.fetch()
  }

  public isAuthor(author: User, user: User): boolean {
    return author.id === user.id
  }

  public formatUptime(uptime: number): string {
    const duration = new DurationFormatter().format(uptime)

    return duration
  }
}
