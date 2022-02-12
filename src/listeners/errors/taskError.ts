import { ApplyOptions } from '@sapphire/decorators'
import { Listener } from '@sapphire/framework'
import { ScheduledTaskEvents } from '@sapphire/plugin-scheduled-tasks'

@ApplyOptions<Listener.Options>({
  event: ScheduledTaskEvents.ScheduledTaskError
})
export default class taskError extends Listener {
  public run(error: Error, task: string) {
    this.container.logger.error(`[TASK] ERROR WITH TASK ${task}: ${error.message} `)
  }
}
