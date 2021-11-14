import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { version as frameworkVersion } from '@sapphire/framework'
import { roundNumber } from '@sapphire/utilities'
import { Message, MessageEmbed, version as djsVersion } from 'discord.js'
import os from 'os'
import { version as tsVersion } from 'typescript'
import pkg from '../../package'

@ApplyOptions<ArielCommandOptions>({
  description: 'Get the discord bot statistics',
  aliases: ['statistics']
})
export default class Stats extends ArielCommand {
  public async messageRun(message: Message) {
    const {
      user,
      users,
      guilds,
      util: { formatUptime }
    } = this.container.client

    const embed = new MessageEmbed()
      .setTitle(`${user.username} | ${pkg.version}`)
      .setThumbnail(user.avatarURL())
      .addFields(
        {
          name: 'Versions',
          value: `Node.js: ${process.version}\nTypeScript: ${tsVersion}\nDiscord.js: ${djsVersion}\nFramework: ${frameworkVersion}`
        },
        {
          name: 'Discord Stats',
          value: `User Count: ${users.cache.size}\nGuild Count: ${guilds.cache.size}`
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
          ).toFixed(2)} MB)\nBot Uptime: ${formatUptime(this.container.client.uptime)}`
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
