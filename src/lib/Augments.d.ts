import type { KSoftClient } from '@aero/ksoft'
import type { PrismaClient } from '@prisma/client'
import type { Piece, SapphireClientOptions } from '@sapphire/framework'
import type { InternationalizationClientOptions } from '@sapphire/plugin-i18next'
import type StatusUpdater from '@tmware/status-rotate'
import type ClientUtils from './ClientUtils'
import type { Env } from './env/types'
import type AnalyiticData from './Structures/AnalyticData'
import type Yiff from './yiff.ts/index'
declare module '@sapphire/pieces' {
  interface Container {
    prisma: PrismaClient
    analytics?: AnalyiticData
  }
}
declare module '@sapphire/framework' {
  interface Preconditions {
    OwnerOnly: never
    Mod: never
    Admin: never
    Manager: never
  }

  interface ArgType {
    piece: Piece
    language: string
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
    ksoft: KSoftClient
    statusUpdater: StatusUpdater
    util: ClientUtils
    Yiff: Yiff
    analytics: AnalyiticData
  }

  interface ClientOptions extends SapphireClientOptions, InternationalizationClientOptions {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
