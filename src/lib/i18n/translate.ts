import { Identifiers } from '@sapphire/framework'
import { LanguageKeys } from './LanguageKeys'

export function translate(identifier: string) {
  switch (identifier) {
    case Identifiers.PreconditionNSFW:
      return LanguageKeys.Preconditions.Nsfw
    case Identifiers.PreconditionClientPermissions:
      return LanguageKeys.Preconditions.ClientPermissions
    default:
      return identifier
  }
}
