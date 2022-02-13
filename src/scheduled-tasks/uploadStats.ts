import { envIsDefined, envParseBoolean, envParseString } from '#lib/env/parser'
import { ArielEvents } from '#types'
import { request as fetch, SendAs } from '@artiefuzzz/lynx'
import { ApplyOptions } from '@sapphire/decorators'
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks'

interface DiscordsResponse {
  message: string
}

interface TopGGResponse {
  server_count: number
  shards?: number[]
  shard_id?: number
  shard_count?: number
}

@ApplyOptions<ScheduledTask.Options>({
  cron: '0 * * * *',
  bullJobOptions: {
    removeOnComplete: true
  }
})
export default class uploadStats extends ScheduledTask {
  public async run() {
    // Upload stats to InfluxDB
    this.syncAnalytics()

    if (envIsDefined('TOPGG_TOKEN')) {
      await fetch<TopGGResponse>(`https://top.gg/api/bots/${this.container.client.id}/stats`, 'POST')
        .headers({
          Authorization: envParseString('TOPGG_TOKEN'),
          'Content-Type': 'application/json'
        })
        .body(
          {
            server_count: this.container.client.guilds.cache.size
          },
          SendAs.JSON
        )
        .send()
        .catch((err: Error) => this.container.logger.error('Error while posting stats to top.gg API.', err))

      this.container.logger.debug('Posted stats to top.gg API.')
    }
    if (envIsDefined('DISCORDS_TOKEN')) {
      await fetch<DiscordsResponse>(`https://discords.com/bots/api/bot/${this.container.client.id}`, 'POST')
        .headers({
          Authorization: envParseString('DISCORDS_TOKEN'),
          'Content-Type': 'application/json'
        })
        .body(
          {
            server_count: this.container.client.guilds.cache.size
          },
          SendAs.JSON
        )
        .send()
        .catch((err: Error) =>
          this.container.logger.error('Error while posting stats to discords.com API / botsfordiscord.com API.', err)
        )

      this.container.logger.debug('Posted stats to discords.com API / botsfordiscord.com API.')
    }

    return true
  }

  private syncAnalytics() {
    if (envParseBoolean('INFLUX_ENABLED')) {
      return this.container.client.emit(ArielEvents.AnalyticSync)
    }

    return undefined
  }
}
