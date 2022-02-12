import { Argument, ArgumentContext } from '@sapphire/framework'
import { Duration } from '@sapphire/time-utilities'

export default class DurationArgument extends Argument<Date> {
  public run(parameter: string, context: ArgumentContext) {
    const date = new Duration(parameter).fromNow

    if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return this.ok(date)

    return this.error({ parameter, context, identifier: 'durationError' })
  }
}
