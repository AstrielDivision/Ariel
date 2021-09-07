/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable no-unused-vars */
import type ClientUtils from './ClientUtils'
import type { KSoftClient } from '@aero/ksoft'
import type { SapphireClientOptions, Store, Piece } from '@sapphire/framework'
import type StatusUpdater from '@tmware/status-rotate'
import type Yiff from './yiff.ts/index'
import type { InternationalizationClientOptions } from '@sapphire/plugin-i18next'
import type { Task } from './Structures/Task'

declare module '@sapphire/framework' {
  interface SapphireClient {
    ksoft: KSoftClient
    statusUpdater: StatusUpdater
    util: ClientUtils
    Yiff: Yiff
  }
  interface ILogger {
    console(...message: unknown[]): void
  }
  interface Preconditions {
    OwnerOnly: never
    Mod: never
    Admin: never
    Manager: never
  }

  interface StoreRegistryEntries {
    tasks: Store<Task>
  }

  interface ArgType {
    piece: Piece
  }
}
declare module 'discord.js' {
  interface ClientOptions extends SapphireClientOptions, InternationalizationClientOptions {}
}
