import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import dayjs from 'dayjs'

@ApplyOptions<ArielCommandOptions>({
  name: 'serverinfo',
  aliases: ['si'],
  description: 'Fetch the current guild\'s info'
})
export default class example extends ArielCommand {
  public async run(message: Message) {
    const guild = message.guild
    const roles: string[] = []

    guild.roles.cache.forEach(r => {
      if (r.name === '@everyone') return null

      return roles.push(r.name)
    })

    const embed = new MessageEmbed()
      .setTitle(`${guild.name} | Guild Info`)
      .setColor('BLURPLE')
      .addFields(
        { name: 'Owner', value: `<@!${(await guild.fetchOwner()).id}>`, inline: true },
        { name: 'Channels', value: guild.channels.cache.size.toString(), inline: true },
        { name: 'Member Count', value: guild.memberCount.toString(), inline: true },
        { name: 'Human Members', value: guild.members.cache.filter(member => !member.user.bot).size.toString() },
        { name: 'Verification Level', value: verificationLevels[guild.verificationLevel], inline: true },
        { name: 'Created At', value: dayjs(guild.createdTimestamp).format('MM/DD/YYYY'), inline: true },
        {
          name: `Roles (${guild.roles.cache.size})`,
          value: roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.trimArray(roles).join(', ') : 'None',
          inline: true
        }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))

    return await message.channel.send({ embeds: [embed] })
  }

  private trimArray(arr: string[], max = 10): string[] {
    if (arr.length > max) {
      const leng = arr.length - max
      arr = arr.slice(0, max)
      arr.push(`${leng} more...`)
    }

    return arr
  }
}

const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: '(╯°□°）╯︵ ┻━┻',
  VERY_HIGH: '┻━┻ ︵ヽ(`□´)ﾉ︵ ┻━┻'
}
