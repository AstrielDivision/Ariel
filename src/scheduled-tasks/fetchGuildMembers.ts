import { ApplyOptions } from '@sapphire/decorators'
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks'

@ApplyOptions<ScheduledTask.Options>({
  bullJobOptions: {
    removeOnComplete: true
  }
})
export default class fetchGuildMembers extends ScheduledTask {
  public run() {
    // Fetch members
    this.container.client.guilds.cache.map(async guild => {
      if (guild.available) return await guild.members.fetch()
      return null
    })

    return true
  }
}
