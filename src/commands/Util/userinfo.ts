import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import dayjs from 'dayjs'

@ApplyOptions<ArielCommandOptions>({
  name: 'userinfo',
  aliases: ['ui'],
  description: 'Fetch a discord user\'s info.',
  usage: '[userID | @user]'
})
export default class UserInfo extends ArielCommand {
  public async run(message: Message, args: Args) {
    const member = (await args.pickResult('member')).value

    return await this.Info(message, member ?? message.member)
  }

  private async Info(message: Message, member: GuildMember) {
    const KSoftBan = await this.container.client.ksoft.bans.check(member.user.id)
    const isBot = member.user.bot

    const embed = new MessageEmbed()
      .setTitle(`${member.toString()}'s Info`)
      .setColor('BLURPLE')
      .setTimestamp()
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .addFields(
        { name: 'Discrim', value: member.user.discriminator, inline: true },
        { name: 'Joined', value: dayjs(member.joinedAt).format('MM/DD/YYYY'), inline: true },
        { name: 'Registered', value: dayjs(member.user.createdAt).format('MM/DD/YYYY'), inline: true },
        { name: 'Banned on KSoft?', value: KSoftBan ? 'Yes' : 'No', inline: true },
        { name: 'Is a Bot?', value: isBot ? 'Yes' : 'No', inline: true }
      )
      .setFooter(`ID: ${member.user.id}`)

    return await message.channel.send({ embeds: [embed] })
  }
}
