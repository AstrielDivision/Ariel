import { envParseBoolean } from '#lib/env/parser'
import { ArielEvents } from '#types'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions, Store } from '@sapphire/framework'

@ApplyOptions<ListenerOptions>({
  once: true
})
export default class Ready extends Listener<typeof Events.ClientReady> {
  private printStoreDebugInformation(): void {
    const { client } = this.container
    const stores = [...client.stores.values()]
    const last = stores.pop()!

    for (const store of stores) {
      this.container.logger.info(this.styleStore(store, false))
    }
    this.container.logger.info(this.styleStore(last, true))
  }

  private styleStore(store: Store<any>, last: boolean): void {
    return this.container.logger.info(`${last ? '└─' : '├─'} Loaded ${store.size} ${store.name}.`)
  }

  private init(): Promise<void> {
    this.container.tasks.create('fetchGuildMembers', {})

    if (envParseBoolean('INFLUX_ENABLED')) {
      this.container.client.emit(ArielEvents.AnalyticSync)
    }

    return null
  }

  public async run() {
    void this.init()

    this.printStoreDebugInformation()
    await this.container.client.statusUpdater.updateStatus()
    return this.container.logger.info(
      `Ready! Logged in as ${this.container.client.user.tag} serving ${this.container.client.guilds.cache.size} Guilds`
    )
  }
}
