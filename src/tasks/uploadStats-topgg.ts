import { Timeouts } from '#lib/constants'
import { Task, TaskOptions } from '#lib/Structures/Task'
import { ApplyOptions } from '@sapphire/decorators'
import { fetch } from '@sapphire/fetch'
import cfg from '../config'

@ApplyOptions<TaskOptions>({
  enabled: cfg.stats.topgg.length > 0,
  time: Timeouts.Hour
})
export default class uploadStatsTOPGG extends Task {
  public async run() {
    await fetch<TopGGResponse>(`https://botsfordiscord.com/api/bot/${this.container.client.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization: cfg.stats.topgg,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        server_count: this.container.client.guilds.cache.size
      })
    }).catch((err: Error) => this.container.logger.error('Error while posting stats to top.gg API.', err))

    return this.container.logger.info('Posted stats to top.gg API.')
  }
}

interface TopGGResponse {
  server_count: number
  shards?: number[]
  shard_id?: number
  shard_count?: number
}
