import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import dayjs from 'dayjs'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['ui'],
  description: 'Fetch a discord user\'s info.',
  usage: '[userID | @user]'
})
export default class UserInfo extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const member = args.finished ? message.member : await args.pick('member')
    const KSoftBan = await this.container.client.ksoft.bans.check(member.user.id)
    const isBot = member.user.bot
    const roles: string[] = []

    message.member.roles.cache.map(r => {
      if (r.name === '@everyone') return null

      return roles.push(r.toString())
    })

    const embed = new MessageEmbed()
      .setTitle(`${member.user.tag} (${member.user.id})`)
      .setColor('BLURPLE')
      .setTimestamp()
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .addFields(
        { name: '• Joined', value: `<t:${dayjs(member.joinedAt).unix()}>`, inline: true },
        { name: '• Registered', value: `<t:${dayjs(member.user.createdAt).unix()}>`, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '• Banned on KSoft?', value: KSoftBan ? 'Yes' : 'No', inline: true },
        { name: '• Is a Bot?', value: isBot ? 'Yes' : 'No', inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '• Server Roles', value: roles.join(', ') }
      )

    return await message.channel.send({ embeds: [embed] })
  }
}
