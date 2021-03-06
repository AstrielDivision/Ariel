import type { KSoftClient } from '@aero/ksoft'
import type { PrismaClient } from '@prisma/client'
import type { Piece, SapphireClientOptions } from '@sapphire/framework'
import type { InternationalizationClientOptions } from '@sapphire/plugin-i18next'
import type { Nullish } from '@sapphire/utilities'
import type StatusUpdater from '@tmware/status-rotate'
import type { Env } from './env/types'
import type AnalyiticData from './Structures/AnalyticData'
import type Yiff from './yiff.ts/index'

declare module '@sapphire/pieces' {
  interface Container {
    prisma: PrismaClient
    analytics?: AnalyiticData | Nullish
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
    duration: Date
    time: number
  }

  interface Args {
    t: TFunction
  }
}
declare module 'discord.js' {
  interface Client {
    ksoft: KSoftClient
    statusUpdater: StatusUpdater
    Yiff: Yiff
  }

  interface ClientOptions extends SapphireClientOptions, InternationalizationClientOptions {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
