import { Argument, ArgumentContext } from '@sapphire/framework'

export default class NanoIdArgument extends Argument<string> {
  public run(parameter: string, context: ArgumentContext) {
    if (parameter.length === 7) return this.ok(parameter)

    return this.error({ parameter, context, message: 'That ID is not valid.' })
  }
}
