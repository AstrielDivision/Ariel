import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import crypto from 'crypto-js'
import { Message, Permissions } from 'discord.js'
import type { TFunction } from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/cryptography:aesDescription',
  flags: ['d', 'decrypt'],
  options: ['secret', 's'],
  usage: '<text> <-s=randomLetters | --secret=randomLetters> [-d | --decrypt]'
})
export default class AES extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const decryptFlag = args.getFlags('d', 'decrypt')
    const text = (await args.restResult('string')).value
    const secret = args.getOption('s', 'secret')

    if (!text) return await message.channel.send(args.t('commands/cryptography:noText'))

    if (!secret) {
      return await message.channel.send(args.t('commands/cryptography:noSecret'))
    }

    if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) await message.delete()

    const result = decryptFlag ? this.decrypt(text, secret, args.t) : this.encrypt(text, secret)

    return await message.channel.send(result)
  }

  /**
   * Input: ABC
   * Secret: ABC
   * Output: U2FsdGVkX1+Ocg9Sepezl979pPZ60p54jzzOEeVt98I=
   */
  private encrypt(input: string, secret: string): string {
    return crypto.AES.encrypt(input, secret).toString()
  }

  /**
   * Input: U2FsdGVkX1+Ocg9Sepezl979pPZ60p54jzzOEeVt98I=
   * Secret: ABC
   * Output: ABC
   */
  private decrypt(input: string, secret: string, t: TFunction): string {
    return (
      crypto.AES.decrypt(input, secret).toString(crypto.enc.Utf8).toString() || t('commands/cryptography:unsuccessful')
    )
  }
}
