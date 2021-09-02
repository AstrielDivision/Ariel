import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { captureException } from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  event: Events.Error
})
export default class ErrorListener extends Listener {
  public run(error: Error): undefined {
    this.container.logger.error(error.stack ?? error.message)

    captureException(error.stack ?? error.message)

    return undefined
  }
}
