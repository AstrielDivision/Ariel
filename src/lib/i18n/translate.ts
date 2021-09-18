import { Identifiers } from '@sapphire/framework'
import { LanguageKeys } from './LanguageKeys'

export function translate(identifier: string) {
  switch (identifier) {
    case Identifiers.PreconditionNSFW:
      return LanguageKeys.Preconditions.Nsfw
    default:
      return identifier
  }
}
