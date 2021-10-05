import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import * as crypto from 'crypto'
import cryptoJS from 'crypto-js'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  name: 'hash',
  description: 'Hash your text',
  detailedDescription: 'Hash your text in either sha1, sha256, sha512, md5 or ripemd',
  flags: ['sha1', 'sha256', 'sha512', 'md5', 'all', 'ripemd']
})
export default class Hash extends ArielCommand {
  public static hash(str: string, algorithm: 'sha1' | 'sha256' | 'sha512' | 'md5' | 'ripemd160'): string {
    switch (algorithm) {
      case 'ripemd160': {
        return cryptoJS.RIPEMD160(str).toString()
      }

      default: {
        return crypto.createHash(algorithm).update(str).digest('hex')
      }
    }
  }

  public async run(message: Message, args: ArielCommand.Args) {
    let allFlag = args.getFlags('all')
    let sha1Flag = args.getFlags('sha1')
    let sha256Flag = args.getFlags('sha256')
    let sha512Flag = args.getFlags('sha512')
    let md5Flag = args.getFlags('md5')
    let ripeMDFlag = args.getFlags('ripemd')

    const text = args.finished ? null : await args.rest('string')

    if (!text) return await message.channel.send('No text provided!')

    if (allFlag) {
      // eslint-disable-next-line no-multi-assign
      sha1Flag = sha256Flag = sha512Flag = md5Flag = ripeMDFlag = true
    }

    if (!sha1Flag && !sha256Flag && !sha512Flag && !md5Flag && !ripeMDFlag) {
      return await message.channel.send(
        'You must provide at least one of these flags:\n--sha1\n--sha256\n--sha512\n--md5\n--ripemd\n--all'
      )
    }

    /*
      Hash value(s) of: ABC
      ---
      MD5    : 902fbdd2b1df0c4f70b4a5d23525e932
      RIPEMD : df62d400e51d3582d53c2d89cfeb6e10d32a3ca6
      SHA1   : 3c01bdbb26f358bab27f267924aa2c9a03fcfdb8
      SHA256 : b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78
      SHA512 : 397118fdac8d83ad98813c50759c85b8c47565d8268bf10da483153b747a74743a58a90e85aa9f705ce6984ffc128db567489817e4092d050d8a1cc596ddc119
    */

    // eslint-disable-next-line no-useless-concat
    let response = '```md\n' + `Hash value(s) of: ${text}\n` + '---'

    if (md5Flag) response += `\nMD5    : ${Hash.hash(text, 'md5')}`
    if (ripeMDFlag) response += `\nRIPEMD : ${Hash.hash(text, 'ripemd160')}`
    if (sha1Flag) response += `\nSHA1   : ${Hash.hash(text, 'sha1')}`
    if (sha256Flag) response += `\nSHA256 : ${Hash.hash(text, 'sha256')}`
    if (sha512Flag) response += `\nSHA512 : ${Hash.hash(text, 'sha512')}`

    response += '\n```'

    return await message.channel.send(response)
  }
}
