import { seconds } from '#util'
import { Argument, ArgumentContext } from '@sapphire/framework'
import { Duration } from '@sapphire/time-utilities'

/**
 * @license Apache License, Version 2.0
 * @copyright Skyra Project
 *
 */

export default class TimeArgument extends Argument<number> {
  public async run(parameter: string, context: ArgumentContext) {
    const duration = this.parse(parameter)

    if (!Number.isSafeInteger(duration)) {
      return await this.error({ parameter, context, identifier: 'timeUnsafeInteger' })
    }

    if (typeof context.minimum === 'number' && duration < context.minimum) {
      return await this.error({ parameter, context, identifier: 'timeLessThan' })
    }

    if (typeof context.maximum === 'number' && duration > context.maximum) {
      return await this.error({ parameter, context, identifier: 'timeGreaterThan' })
    }

    console.log(duration)

    return await this.ok(duration)
  }

  private parse(parameter: string): number {
    const number = Number(parameter)

    if (!Number.isNaN(number)) return seconds(number)

    const duration = new Duration(parameter).offset

    if (!Number.isNaN(duration)) return duration

    const date = Date.parse(parameter)

    if (!Number.isNaN(date)) return date - Date.now()

    return NaN
  }
}
