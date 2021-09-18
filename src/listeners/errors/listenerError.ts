import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerErrorPayload, ListenerOptions } from '@sapphire/framework'
import { captureException } from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  event: Events.ListenerError
})
export default class CoreEvent extends Listener {
  public run(error: Error, { piece }: ListenerErrorPayload): undefined {
    this.container.logger.fatal(`[LISTENER] ${piece.name}\n${error.stack ?? error.message}`)

    captureException(error.stack ?? error.message, { tags: { name: piece.name } })

    return undefined
  }
}
