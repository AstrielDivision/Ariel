import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { pkg } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/misc:about.description'
})
export default class About extends ArielCommand {
  /**
   * * Based on https://github.com/TMUniversal/discord-bot-template/blob/master/src/commands/basic/AboutCommand.ts
   * * Licensed under the MIT License
   */
  public async messageRun(message: Message) {
    const embed = new MessageEmbed({
      title: `${this.container.client.user.username} - About`,
      color: 'AQUA',
      description:
        `Hello! I'm ${this.container.client.user.username}.` +
        '\nI am a Image discord bot with some other tools too.' +
        '\n Need images? I\'m the bot you need',
      fields: [
        {
          name: 'Developed by',
          value: 'ArtieFuzzz#8298 @ [AstrielDivision](https://github.com/AstrielDivision/Ariel)'
        },
        {
          name: 'Contributors',
          value: pkg.contributors.map(c => `${c.name} <${c.email}> [Website](${c.url})`).join('\n')
        },
        {
          name: 'Built With',
          value:
            '[Discord.js](https://github.com/discordjs/discord.js)\n [Sapphire](https://github.com/sapphiredev/framework)'
        }
      ],
      footer: {
        text: `v${pkg.version} - Written in TypeScript, powered by Node.js`
      },
      timestamp: new Date(),
      thumbnail: {
        url: this.container.client.user.avatarURL()
      }
    })

    return await message.channel.send({ embeds: [embed] })
  }
}
