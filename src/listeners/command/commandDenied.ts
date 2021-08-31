import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<ListenerOptions>({
  event: Events.CommandDenied
})
export default class CommandDenied extends Listener {
  public async run({ message: content }: UserError, { message }: CommandDeniedPayload): Promise<unknown> {
    // `context: { silent: true }` should make UserError silent:
    // Use cases for this are for example permissions error when running the `eval` command.
    if (Reflect.get(Object(content), 'silent')) return

    return await message.channel.send({ content, allowedMentions: { users: [message.author.id], roles: [] } })
  }
}
