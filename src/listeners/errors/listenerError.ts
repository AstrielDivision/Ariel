import { Events, Listener, ListenerOptions, ListenerErrorPayload } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { captureException } from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  name: 'CoreEventError',
  event: Events.ListenerError
})
export default class CoreEvent extends Listener {
  public async run(error: Error, { piece }: ListenerErrorPayload): Promise<unknown> {
    this.container.logger.fatal(`[LISTENER] ${piece.path}\n${error.stack ?? error.message}`)

    captureException(error.stack ?? error.message, { tags: { name: piece.name } })

    return undefined
  }
}
