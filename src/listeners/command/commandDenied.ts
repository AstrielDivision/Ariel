import { translate } from '#lib/i18n/translate'
import { ApplyOptions } from '@sapphire/decorators'
import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from '@sapphire/framework'
import { resolveKey } from '@sapphire/plugin-i18next'

@ApplyOptions<ListenerOptions>({
  event: Events.CommandDenied
})
export default class CommandDenied extends Listener {
  public async run(error: UserError, { message, command }: CommandDeniedPayload): Promise<unknown> {
    // `context: { silent: true }` should make UserError silent:
    // Use cases for this are for example permissions error when running the `eval` command.
    if (Reflect.get(Object(error.context), 'silent')) return

    const identifier = translate(error.identifier)
    const content = await resolveKey(message, identifier, { message, command, ...(error.context as any) })

    return await message.channel.send({ content, allowedMentions: { users: [message.author.id], roles: [] } })
  }
}
