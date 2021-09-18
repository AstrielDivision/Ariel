import { translate } from '#lib/i18n/translate'
import type { ArielCommand } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { CommandErrorPayload, Events, Listener, ListenerOptions, UserError } from '@sapphire/framework'
import { captureException } from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  event: Events.CommandError
})
export default class CoreCommandError extends Listener {
  public async run(error: Error, { message, piece, args }: CommandErrorPayload): Promise<unknown> {
    if (typeof error === 'string') return await message.channel.send(error)
    if (error instanceof UserError) {
      const identifier = translate(error.identifier)
      return await message.channel.send(args.t(identifier))
    }

    const command = piece as ArielCommand

    this.container.logger.fatal(`[COMMAND] ${command.name}\n${error.stack ?? error.message}`)

    captureException(error.stack ?? error.message, { tags: { name: piece.name } })

    return undefined
  }
}
