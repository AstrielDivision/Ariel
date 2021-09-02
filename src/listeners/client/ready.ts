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

  public run(): void {
    this.container.client.guilds.cache.map(async guild => {
      if (guild.available) return await guild.members.fetch()
      return null
    })

    this.printStoreDebugInformation()
    void this.container.client.statusUpdater.updateStatus()
    return this.container.logger.info(
      `Ready! Logged in as ${this.container.client.user.tag} serving ${this.container.client.guilds.cache.size} Guilds`
    )
  }
}
