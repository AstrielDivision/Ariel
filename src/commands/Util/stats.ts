import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { version } from '@sapphire/framework'
import { roundNumber } from '@sapphire/utilities'
import { Message, MessageEmbed, version as djs } from 'discord.js'
import os from 'os'
import { version as ts } from 'typescript'
import { pkg } from '../../config'

@ApplyOptions<ArielCommandOptions>({
  name: 'stats',
  description: 'Get the discord bot statistics',
  aliases: ['statistics']
})
export default class Stats extends ArielCommand {
  public async run(message: Message) {
    const embed = new MessageEmbed()
      .setTitle(`${this.container.client.user.username} | ${pkg.version}`)
      .setThumbnail(this.container.client.user.avatarURL())
      .addFields(
        {
          name: 'Versions',
          value: `Node.js: ${process.version}\nTypeScript: ${ts}\nDiscord.js: ${djs}\nFramework: ${version}`
        },
        {
          name: 'Discord Stats',
          value: `User Count: ${this.container.client.users.cache.size}\nGuild Count: ${this.container.client.guilds.cache.size}`
        },
        {
          name: 'Server Stats',
          value: `CPU Load (${os.cpus().length} Core(s)): ${os
            .cpus()
            .map(this.formatCPU.bind(null))
            .join(' | ')}\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB (Total: ${(
            process.memoryUsage().heapTotal /
            1024 /
            1024
          ).toFixed(2)} MB)`
        }
      )
      .setColor('YELLOW')
    return await message.channel.send({
      embeds: [embed]
    })
  }

  private formatCPU({ times }: os.CpuInfo): string {
    return `${roundNumber(((times.user + times.nice + times.sys + times.irq) / times.idle) * 10000) / 100}%`
  }
}
