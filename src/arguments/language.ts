import { LanguageKeys } from '#languages'
import { Argument, ArgumentContext } from '@sapphire/framework'

export default class LanguageArgument extends Argument<string> {
  public run(parameter: string, context: ArgumentContext) {
    const languages = this.container.i18n.languages

    if (languages.has(parameter)) return this.ok(parameter)

    return this.error({ parameter, context, identifier: LanguageKeys.Arguments.Language })
  }
}
