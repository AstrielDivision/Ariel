import { AnalyticsListener } from '#lib/Structures/AnalyticListener'
import { ApplyOptions } from '@sapphire/decorators'
import { Events } from '@sapphire/framework'

@ApplyOptions<AnalyticsListener.Options>({
  event: Events.MessageCreate
})
export default class MessageCreateAnalytic extends AnalyticsListener {
  public run() {
    this.container.analytics.messages++
  }
}
