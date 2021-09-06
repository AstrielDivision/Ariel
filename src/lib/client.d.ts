/* eslint-disable no-unused-vars */
import ClientUtils from './ClientUtils'
import { KSoftClient } from '@aero/ksoft'
import { SapphireClientOptions } from '@sapphire/framework'
import StatusUpdater from '@tmware/status-rotate'
import Yiff from './yiff.ts/index'
import { InternationalizationClientOptions } from '@sapphire/plugin-i18next'

declare module '@sapphire/framework' {
  interface SapphireClient {
    ksoft: KSoftClient
    statusUpdater: StatusUpdater
    util: ClientUtils
    Yiff: Yiff
  }
  interface ILogger {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    console(...message: unknown[]): void
  }
  interface Preconditions {
    OwnerOnly: never
    Mod: never
    Admin: never
    Manager: never
  }
}
declare module 'discord.js' {
  interface ClientOptions extends SapphireClientOptions, InternationalizationClientOptions {}
}
