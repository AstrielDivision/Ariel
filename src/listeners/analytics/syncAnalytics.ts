import { AnalyticsListener } from '#lib/Structures/AnalyticListener'
import { ArielEvents, Points } from '#types'
import { Point } from '@influxdata/influxdb-client'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AnalyticsListener.Options>({
  event: ArielEvents.AnalyticSync
})
export default class Sync extends AnalyticsListener {
  public run() {
    const guilds = this.container.client.users.cache.size
    const users = this.container.client.guilds.cache.reduce((acc, val) => acc + (val.memberCount ?? 0), 0)

    this.writePoints([this.syncGuilds(guilds), this.syncUsers(users)])

    return this.container.analytics.writeApi.flush()
  }

  private syncUsers(users: number) {
    return new Point(Points.Users).tag('action', 'sync').intField('value', users)
  }

  private syncGuilds(guilds: number) {
    return new Point(Points.Guilds).tag('action', 'sync').intField('value', guilds)
  }
}
