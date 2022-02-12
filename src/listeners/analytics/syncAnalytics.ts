import { AnalyticsListener } from '#lib/Structures/AnalyticListener'
import { Actions, ArielEvents, Points, Tags } from '#types'
import { Point } from '@influxdata/influxdb-client'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AnalyticsListener.Options>({
  event: ArielEvents.AnalyticSync
})
export default class Sync extends AnalyticsListener {
  public run() {
    const rawGuildCount = this.container.client.guilds.cache.size
    const rawUserCount = this.container.client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0)

    this.writePoints([this.syncGuilds(rawGuildCount), this.syncUsers(rawUserCount), this.syncMessages()])

    return this.container.analytics.writeApi.flush()
  }

  private syncUsers(users: number) {
    return new Point(Points.Users).tag(Tags.Action, Actions.Sync).intField('value', users)
  }

  private syncGuilds(guilds: number) {
    return new Point(Points.Guilds).tag(Tags.Action, Actions.Sync).intField('value', guilds)
  }

  private syncMessages() {
    const messages = this.container.analytics.messages
    this.container.analytics.messages = 0

    return new Point(Points.Messages).tag(Tags.Action, Actions.Sync).intField('value', messages)
  }
}
