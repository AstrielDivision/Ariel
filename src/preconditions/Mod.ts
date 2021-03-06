import { LanguageKeys } from '#languages'
import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { Permissions } from 'discord.js'

const authorizingPermissions = [
  Permissions.FLAGS.KICK_MEMBERS,
  Permissions.FLAGS.BAN_MEMBERS,
  Permissions.FLAGS.MANAGE_MESSAGES
]

export default class Mod extends Precondition {
  public run(message: Message): PreconditionResult {
    if (!message.guild) return this.error()

    let isAuthorized = false

    for (const perm of authorizingPermissions) {
      if (message.member.permissions.has(perm)) {
        isAuthorized = true
        break
      }
    }

    if (isAuthorized) return this.ok()

    return this.error({ identifier: LanguageKeys.Preconditions.Mod })
  }
}
