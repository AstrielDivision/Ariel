import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { Permissions } from 'discord.js'

const authorizingPermissions = [
  Permissions.FLAGS.KICK_MEMBERS,
  Permissions.FLAGS.BAN_MEMBERS,
  Permissions.FLAGS.MANAGE_GUILD,
  Permissions.FLAGS.MANAGE_CHANNELS
]

export default class Mod extends Precondition {
  public run(message: Message): PreconditionResult {
    if (!message.guild) return this.error({ message: 'You cannot run this command in DMs.' })

    let isAuthorized = false

    for (const perm of authorizingPermissions) {
      if (message.member.permissions.has(perm)) {
        isAuthorized = true
        break
      }
    }

    if (isAuthorized) return this.ok()

    return this.error({ message: 'You aren\'t allowed to execute this command.' })
  }
}
