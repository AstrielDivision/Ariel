import { Events, Listener, ListenerOptions, Store } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<ListenerOptions>({
  once: true
})
export default class Ready extends Listener<typeof Events.ClientReady> {
  private printStoreDebugInformation(): void {
    const { client } = this.container
    const stores = [...client.stores.values()]
    const last = stores.pop()!

    for (const store of stores) {
      this.container.logger.console(this.styleStore(store, false))
    }
    this.container.logger.console(this.styleStore(last, true))
  }

  private styleStore(store: Store<any>, last: boolean): void {
    return this.container.logger.console(`${last ? '└─' : '├─'} Loaded ${store.size} ${store.name}.`)
  }

  private async init(): Promise<void> {
    await this.container.stores.get('tasks').loadAll()

    return null
  }

  public async run() {
    await this.init()

    this.printStoreDebugInformation()
    await this.container.client.statusUpdater.updateStatus()
    return this.container.logger.info(
      `Ready! Logged in as ${this.container.client.user.tag} serving ${this.container.client.guilds.cache.size} Guilds`
    )
  }
}
