import { envIsDefined, envParseBoolean, envParseString } from '#lib/env/parser'
import Yiff from '#lib/yiff.ts/index'
import '#setup'
import { KSoftClient } from '@aero/ksoft'
import { PrismaClient } from '@prisma/client'
import { container, SapphireClient, version } from '@sapphire/framework'
import * as Sentry from '@sentry/node'
import StatusUpdater from '@tmware/status-rotate'
import { ClientOptions, Message, version as djs } from 'discord.js'
import pkg from '../package'
import ClientUtils from './ClientUtils'
import AnalyticData from './Structures/AnalyticData'

export default class Client extends SapphireClient {
  ksoft: KSoftClient
  statusUpdater: StatusUpdater
  util: ClientUtils
  Yiff!: Yiff
  prisma!: PrismaClient
  constructor(options: ClientOptions) {
    super(options)

    this.ksoft = new KSoftClient(envParseString('KSOFT_TOKEN'))
    this.util = new ClientUtils(this)
    this.Yiff = new Yiff()
    this.statusUpdater = new StatusUpdater(this, [
      {
        type: 'WATCHING',
        name: `The Stars Get Dark. | ${envParseString('PREFIX')}`
      },
      {
        type: 'LISTENING',
        name: `Music | ${envParseString('PREFIX')}`
      },
      {
        type: 'PLAYING',
        name: 'Rainbow 6 Siege'
      },
      {
        type: 'WATCHING',
        name: 'The dark skies of the earth.'
      }
    ])

    container.analytics = envParseBoolean('INFLUX_ENABLED') ? new AnalyticData() : null
  }

  /**
   * Starts the Client / Bot
   * @returns {Promise<Client>}
   */
  public async start(): Promise<Client> {
    await this.init()
    await super.login()

    return this
  }

  public stop() {
    this.logger.warn('Received exit signal. Terminating in 5 seconds...')
    this.destroy()
    setTimeout(() => {
      this.logger.warn('Terminating...')
      process.exit(0)
    }, 5000)
  }

  private async init(): Promise<void> {
    const prisma = new PrismaClient({
      errorFormat: 'pretty'
    })

    this.prisma = prisma

    container.prisma = prisma

    if (envIsDefined('SENTRY_URI')) {
      Sentry.init({
        dsn: envParseString('SENTRY_URI'),
        release: `Ariel@${pkg.version}`,
        tracesSampleRate: 1.0
      })
      Sentry.setTags({
        'discord.js': djs,
        framework: version,
        version: pkg.version
      })
    }

    await this.prisma.$connect()

    // Automate status change
    setInterval(() => {
      void this.statusUpdater.updateStatus()
    }, 2 * 60 * 1000) // Change status every 2 minutes

    process.once('SIGINT', () => this.stop())
    process.once('SIGTERM', () => this.stop())
  }

  public fetchPrefix = async (message: Message) => {
    const { prefix } = await this.prisma.guildSettings.findUnique({ where: { guildId: message.guild.id } })

    return prefix ?? envParseString('PREFIX')
  }
}
