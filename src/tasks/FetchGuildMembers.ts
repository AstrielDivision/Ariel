import { Task } from '#lib/Structures/Task'

export default class testTask extends Task {
  public run(): undefined {
    this.container.client.guilds.cache.map(async guild => {
      if (guild.available) return await guild.members.fetch()
      return null
    })

    return undefined
  }
}
