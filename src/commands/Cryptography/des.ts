import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import crypto from 'crypto-js'
import { Message, Permissions } from 'discord.js'
import { ArielCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'des',
  description: 'Encrypt a message with DES or decrypt a DES message',
  usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>> [--triple or -t]',
  options: ['secret', 's'],
  flags: ['d', 'decrypt', 'triple', 't']
})
export default class DES extends ArielCommand {
  public async run(message: Message, args: Args) {
    const text = (await args.restResult('string')).value
    const secret = args.getOption('secret', 's')
    const decryptFlag = args.getFlags('decrypt', 'd')
    const tripleFlag = args.getFlags('triple', 't')

    if (!text) return await message.channel.send('No text provided.')
    if (!secret) {
      return await message.channel.send('No secret provided. (Hint: use --secret=<randomText> or -s=<randomText>)')
    }

    //
    if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) void message.delete()

    const result = decryptFlag ? this.decrypt(text, secret, tripleFlag) : this.encrypt(text, secret, tripleFlag)

    return await message.channel.send(result)
  }

  /**
   * * Normal
   * ---
   * Input: ABC
   * Secret: ABC
   * Output: U2FsdGVkX18hSOfJV6V+HZyx7Pt6sw9H
   * ---
   *  * TripleDES
   * ---
   * Input: ABC
   * Secret: ABC
   * Output: U2FsdGVkX1/JdlBm8M+tXszBgkrIzCjX (Output may vary)
   */
  private encrypt(text: string, secret: string, triple?: boolean): string {
    // For TripleDES, DES is applied thrice. It is believed that it is secure in this form
    return (triple ? crypto.TripleDES.encrypt(text, secret) : crypto.DES.encrypt(text, secret)).toString()
  }

  /**
   * * Normal
   * ---
   * Input: ABC
   * Secret: ABC
   * Output: U2FsdGVkX18hSOfJV6V+HZyx7Pt6sw9H
   * ---
   * * TripleDES
   * ---
   * Input: U2FsdGVkX1/JdlBm8M+tXszBgkrIzCjX
   * Secret: ABC
   * Output: ABC
   */
  private decrypt(text: string, secret: string, triple?: boolean): string {
    return (triple ? crypto.TripleDES.decrypt(text, secret) : crypto.DES.decrypt(text, secret)).toString()
  }
}
