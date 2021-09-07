import { Task, TaskOptions } from '#lib/Structures/Task'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<TaskOptions>({
  time: 10
})
export default class testTask extends Task {
  public run() {
    return this.container.logger.console('I run every 10 seconds!')
  }
}
