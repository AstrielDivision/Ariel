import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import crypto from 'crypto-js'
import { Message, Permissions } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/cryptography:desDescription',
  usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>> [--triple / -t]',
  options: ['secret', 's'],
  flags: ['d', 'decrypt', 'triple', 't']
})
export default class DES extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const text = args.finished ? null : await args.rest('string')
    const secret = args.getOption('secret', 's')
    const decryptFlag = args.getFlags('decrypt', 'd')
    const tripleFlag = args.getFlags('triple', 't')

    if (!text) return await message.channel.send(args.t('commands/cryptography:noText'))
    if (!secret) {
      return await message.channel.send(args.t('commands/cryptography:noSecret'))
    }

    if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) await message.delete()

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
