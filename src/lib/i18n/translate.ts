import { Identifiers } from '@sapphire/framework'
import { keys } from './keys'

export function translate(identifier: string) {
  switch (identifier) {
    case Identifiers.PreconditionNSFW:
      return keys.Nsfw
    default:
      return identifier
  }
}
