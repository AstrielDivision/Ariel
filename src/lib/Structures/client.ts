import GuildSettings from '#lib/Models/GuildSettings'
import Yiff from '#lib/yiff.ts/index'
import '#setup'
import { KSoftClient } from '@aero/ksoft'
import { SapphireClient, version } from '@sapphire/framework'
import * as Sentry from '@sentry/node'
import StatusUpdater from '@tmware/status-rotate'
import { ClientOptions, Message, version as djs } from 'discord.js'
import mongoose from 'mongoose'
import { join } from 'path'
import cfg, { pkg } from '../../config'
import ClientUtils from '../ClientUtils'
import { TaskStore } from './TaskStore'

export default class Client extends SapphireClient {
  ksoft: KSoftClient
  statusUpdater: StatusUpdater
  util: ClientUtils
  Yiff: Yiff
  constructor(options: ClientOptions) {
    super(options)

    this.ksoft = new KSoftClient(cfg.ksoft)
    this.util = new ClientUtils(this)
    this.Yiff = new Yiff(this)
    this.statusUpdater = new StatusUpdater(this, [
      {
        type: 'LISTENING',
        name: `Signals from the endless outer space | ${cfg.prefix}`
      },
      {
        type: 'LISTENING',
        name: `Music | ${cfg.prefix}`
      },
      {
        type: 'PLAYING',
        name: 'Rainbow 6 Siege'
      },
      {
        type: 'PLAYING',
        name: 'CS:GO'
      },
      {
        type: 'COMPETING',
        name: 'against others'
      },
      {
        type: 'WATCHING',
        name: 'The dark skies of the earth'
      }
    ])
  }

  /**
   * Starts the Client / Bot
   * @returns {Promise<Client>}
   */
  public async start(): Promise<Client> {
    await super.login(cfg.token)
    await this.init()

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
    Sentry.init({
      dsn: cfg.sentry,
      release: `Ariel@${pkg.version}`,
      tracesSampleRate: 1.0
    })
    Sentry.setTags({
      'discord.js': djs,
      framework: version,
      version: pkg.version
    })

    this.stores.register(new TaskStore().registerPath(join(__dirname, '..', '..', 'tasks')))

    await mongoose
      .connect(cfg.mongo.uri)
      .then(() => {
        this.logger.info('Connected to MongoDB database')
      })
      .catch((err: Error) => {
        this.logger.fatal('Error while connecting to MongoDB database', err)
      })

    // Automate status change
    setInterval(() => {
      void this.statusUpdater.updateStatus()
    }, 2 * 60 * 1000) // Change status every 2 minutes

    process.once('SIGINT', () => this.stop())
    process.once('SIGTERM', () => this.stop())
  }

  public fetchPrefix = async (message: Message) => {
    const { prefix } = await GuildSettings.findOne({ guild_id: message.guild.id })

    return prefix ?? cfg.prefix
  }
}
