import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import crypto from 'crypto-js'
import { Message, Permissions } from 'discord.js'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'

@ApplyOptions<ArielCommandOptions>({
  name: 'aes',
  description: 'Encrypt or Decrypt AES encrypted messages',
  flags: ['d', 'decrypt'],
  options: ['secret', 's'],
  usage: 'aes <text> <-s=randomLetters | --secret=randomLetters> [-d | --decrypt]'
})
export default class AES extends ArielCommand {
  public async run(message: Message, args: Args) {
    const decryptFlag = args.getFlags('d', 'decrypt')
    const text = (await args.restResult('string')).value
    const secret = args.getOption('s', 'secret')

    if (!text) return await message.channel.send('No text provided')

    if (!secret) {
      return await message.channel.send(
        'No secret provided. (Hint: Use -s=<randomLetters> or --secret=<randomLetters>)'
      )
    }

    if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) void message.delete()

    const result = decryptFlag ? this.decrypt(text, secret) : this.encrypt(text, secret)

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
  private decrypt(input: string, secret: string): string {
    return crypto.AES.decrypt(input, secret).toString(crypto.enc.Utf8).toString() || 'Decryption Unsuccessful'
  }
}
