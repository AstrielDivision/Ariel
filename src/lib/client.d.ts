import { KSoftClient } from '@aero/ksoft'
import StatusUpdater from '@tmware/status-rotate'
import ClientUtils from './ClientUtils'
import { SapphireClientOptions } from '@sapphire/framework'
import Yiff from './yiff.ts/index'

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
  }
}
declare module 'discord.js' {
  interface ClientOptions extends SapphireClientOptions {}
}
