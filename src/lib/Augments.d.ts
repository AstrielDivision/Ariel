/* eslint-disable @typescript-eslint/method-signature-style */
import type { KSoftClient } from '@aero/ksoft'
import type { PrismaClient } from '@prisma/client'
import type { Piece, SapphireClientOptions, Store } from '@sapphire/framework'
import type { Server, ServerOptions } from '@sapphire/plugin-api'
import type { InternationalizationClientOptions } from '@sapphire/plugin-i18next'
import type StatusUpdater from '@tmware/status-rotate'
import type ClientUtils from './ClientUtils'
import type { Env } from './env/types'
import type { Task } from './Structures/Task'
import type Yiff from './yiff.ts/index'

declare module '@sapphire/pieces' {
  interface Container {
    prisma: PrismaClient
  }
}
declare module '@sapphire/framework' {
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

  interface ScheduledTasks {
    manual: never
  }
}
declare module 'discord.js' {
  interface Client {
    server: Server
    ksoft: KSoftClient
    statusUpdater: StatusUpdater
    util: ClientUtils
    Yiff: Yiff
  }

  interface ClientOptions extends SapphireClientOptions, InternationalizationClientOptions {
    api: ServerOptions
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
