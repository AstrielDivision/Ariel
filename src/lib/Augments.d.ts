/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable no-unused-vars */
import type { KSoftClient } from '@aero/ksoft'
import type { Piece, SapphireClientOptions, Store } from '@sapphire/framework'
import type { Server, ServerOptions } from '@sapphire/plugin-api'
import type { InternationalizationClientOptions } from '@sapphire/plugin-i18next'
import type StatusUpdater from '@tmware/status-rotate'
import type ClientUtils from './ClientUtils'
import type { Task } from './Structures/Task'
import type Yiff from './yiff.ts/index'

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
    language: string
    nanoID: string
  }

  interface Args {
    t: TFunction
  }
}
declare module 'discord.js' {
  interface Client {
    server: Server
  }

  interface ClientOptions extends SapphireClientOptions, InternationalizationClientOptions {
    api: ServerOptions
  }
}
