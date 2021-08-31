import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import crypto from 'crypto-js'
import { Permissions, Message } from 'discord.js'
import { ArielCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'rc4',
  aliases: ['rc4drop'],
  description: 'Encrypt messages by using the RC4Drop cipher or decrypt RC4Drop encrypted messages',
  usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>>',
  options: ['secret', 's'],
  flags: ['d', 'decrypt']
})
export default class RC4Drop extends ArielCommand {
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

    //
    if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) void message.delete()

    const result = decryptFlag ? this.decrypt(text, secret) : this.encrypt(text, secret)

    return await message.channel.send(result)
  }

  /**
   * Input: ABC
   * Secret: ABC
   * Output: U2FsdGVkX1/64CRgHLq4o4+2uPg=
   */
  private encrypt(input: string, secret: string): string {
    return crypto.RC4Drop.encrypt(input, secret).toString()
  }

  /**
   * Input: U2FsdGVkX1/64CRgHLq4o4+2uPg=
   * Secret: ABC
   * Output: ABC
   */
  private decrypt(input: string, secret: string): string {
    return crypto.RC4Drop.decrypt(input, secret).toString(crypto.enc.Utf8)
  }
}
