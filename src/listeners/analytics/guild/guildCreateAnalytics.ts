import { AnalyticsListener } from '#lib/Structures/AnalyticListener'
import { Actions, Points, Tags } from '#types'
import { Point } from '@influxdata/influxdb-client'
import { ApplyOptions } from '@sapphire/decorators'
import { Events } from '@sapphire/framework'
import type { Guild } from 'discord.js'

@ApplyOptions<AnalyticsListener.Options>({
  event: Events.GuildCreate
})
export default class guildCreateAnalytic extends AnalyticsListener {
  public run(guild: Guild) {
    const guilds = new Point(Points.Guilds)
      .tag(Tags.Action, Actions.Addition)
      .intField('value', guild.client.guilds.cache.size)

    const users = new Point(Points.Users).tag(Tags.Action, Actions.Addition).intField(
      'value',
      guild.client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0)
    )

    this.writePoints([guilds, users])
  }
}
