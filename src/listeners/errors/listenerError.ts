import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerErrorPayload, ListenerOptions } from '@sapphire/framework'
import { captureException } from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  name: 'CoreEventError',
  event: Events.ListenerError
})
export default class CoreEvent extends Listener {
  public run(error: Error, { piece }: ListenerErrorPayload): undefined {
    this.container.logger.fatal(`[LISTENER] ${piece.path}\n${error.stack ?? error.message}`)

    captureException(error.stack ?? error.message, { tags: { name: piece.name } })

    return undefined
  }
}
