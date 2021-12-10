import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import dayjs from 'dayjs'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['si'],
  description: 'Fetch the current guild\'s info'
})
export default class example extends ArielCommand {
  public async messageRun(message: Message) {
    const guild = message.guild
    const roles: string[] = []

    guild.roles.cache.forEach(r => {
      if (r.name === '@everyone') return null

      return roles.push(r.toString())
    })

    const embed = new MessageEmbed()
      .setTitle(`${guild.name} [${guild.id}]`)
      .setColor('BLURPLE')
      .addFields(
        { name: '• Owner', value: `<@!${(await guild.fetchOwner()).id}> (${(await guild.fetchOwner()).id})` },
        { name: '• Verification Level', value: verificationLevels[guild.verificationLevel], inline: true },
        { name: '• Created At', value: `<t:${dayjs(guild.createdTimestamp).unix()}>`, inline: true },
        { name: '\u200b', value: '\u200b', inline: true },
        {
          name: `• Channels [${guild.channels.cache.size.toString()}]`,
          value: [
            `• Text: ${guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size.toString()}`,
            `• Voice: ${guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size.toString()}`
          ].join('\n'),
          inline: true
        },
        {
          name: `• Members [${guild.memberCount}]`,
          value: [
            `• Humans: ${guild.members.cache.filter(member => !member.user.bot).size.toString()}`,
            `• Bots: ${guild.members.cache.filter(member => member.user.bot).size.toString()}`
          ].join('\n'),
          inline: true
        },
        { name: '\u200b', value: '\u200b', inline: true }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))

    return await message.channel.send({ embeds: [embed] })
  }
}

const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: '(╯°□°）╯︵ ┻━┻',
  VERY_HIGH: '┻━┻ ︵ヽ(`□´)ﾉ︵ ┻━┻'
}
