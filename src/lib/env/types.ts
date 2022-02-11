/**
 * @license Apache License, Version 2.0
 * @copyright Skyra Project
 *
 * Changes made: Renamed types
 */

export type BooleanString = 'true' | 'false'
export type IntegerString = `${bigint}`

export type EnvAny = keyof Env
export type EnvString = { [K in EnvAny]: Env[K] extends BooleanString | IntegerString ? never : K }[EnvAny]
export type EnvBoolean = { [K in EnvAny]: Env[K] extends BooleanString ? K : never }[EnvAny]
export type EnvInteger = { [K in EnvAny]: Env[K] extends IntegerString ? K : never }[EnvAny]

export interface Env {
  DISCORD_TOKEN: string
  WEBHOOK_URL: string
  PREFIX: string
  OWNERS: string
  KSOFT_TOKEN: string
  E621_USER: string
  E621_API_KEY: string
  SENTRY_URI: string
  DISCORDS_TOKEN: string
  TOPGG_TOKEN: string
  INFLUX_TOKEN: string
  INFLUX_ORG: string
  INFLUX_BUCKET: string
  INFLUX_ENABLED: BooleanString
  INFLUX_URL: string
}
