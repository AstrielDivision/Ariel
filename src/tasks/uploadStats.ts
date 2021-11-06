import { Timeouts } from '#lib/constants'
import { envIsDefined, envParseString } from '#lib/env/parser'
import { Task, TaskOptions } from '#lib/Structures/Task'
import { ApplyOptions } from '@sapphire/decorators'
import { fetch } from '@sapphire/fetch'

@ApplyOptions<TaskOptions>({
  time: Timeouts.Hour
})
export default class uploadStats extends Task {
  public async run(): Promise<unknown> {
    if (envIsDefined('TOPGG_TOKEN')) {
      await fetch<TopGGResponse>(`https://top.gg/api/bots/${this.container.client.id}/stats`, {
        method: 'POST',
        headers: {
          Authorization: envParseString('TOPGG_TOKEN'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_count: this.container.client.guilds.cache.size
        })
      }).catch((err: Error) => this.container.logger.error('Error while posting stats to top.gg API.', err))

      this.container.logger.console('Posted stats to top.gg API.')
    }
    if (envIsDefined('DISCORDS_TOKEN')) {
      await fetch<DiscordsResponse>(`https://discords.com/bots/api/bot/${this.container.client.id}`, {
        method: 'POST',
        headers: {
          Authorization: envParseString('DISCORDS_TOKEN'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_count: this.container.client.guilds.cache.size
        })
      }).catch((err: Error) =>
        this.container.logger.error('Error while posting stats to discords.com API / botsfordiscord.com API.', err)
      )

      this.container.logger.console('Posted stats to discords.com API / botsfordiscord.com API.')
    }

    return null
  }
}

interface DiscordsResponse {
  message: string
}

interface TopGGResponse {
  server_count: number
  shards?: number[]
  shard_id?: number
  shard_count?: number
}
