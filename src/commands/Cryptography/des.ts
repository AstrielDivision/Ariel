import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import crypto from 'crypto-js'
import { Message, Permissions } from 'discord.js'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import i18 from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/cryptography:desDescription',
  usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>> [--triple / -t]',
  options: ['secret', 's'],
  flags: ['d', 'decrypt', 'triple', 't']
})
export default class DES extends ArielCommand {
  public async run(message: Message, args: Args) {
    const text = (await args.restResult('string')).value
    const secret = args.getOption('secret', 's')
    const decryptFlag = args.getFlags('decrypt', 'd')
    const tripleFlag = args.getFlags('triple', 't')

    if (!text) return await message.channel.send(i18.t('commands/cryptography:noText'))
    if (!secret) {
      return await message.channel.send(i18.t('commands/cryptography:noSecret'))
    }

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
