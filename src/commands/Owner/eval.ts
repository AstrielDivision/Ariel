import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Type } from '@sapphire/type'
import { codeBlock, isThenable } from '@sapphire/utilities'
import type { Message } from 'discord.js'
import { inspect } from 'util'
import { FetchResultTypes, FetchMethods, fetch } from '@sapphire/fetch'

@ApplyOptions<ArielCommandOptions>({
  name: 'eval',
  aliases: ['ev'],
  description: 'Evals any JavaScript code',
  quotes: [],
  flags: ['async', 'hidden', 'showHidden', 'silent', 's'],
  options: ['depth'],
  usage: '<expression | JavaScript> [--async, --hidden | --showhidden, --silent | -s]',
  preconditions: ['OwnerOnly']
})
export default class extends ArielCommand {
  public async run(message: Message, args: Args) {
    const code = (await args.restResult('string')).value

    if (!code) return await message.channel.send('I cannot evaluate nothingness!')

    const { result, success, type } = await this.eval(message, code, {
      async: args.getFlags('async'),
      depth: Number(args.getOption('depth')) ?? 0,
      showHidden: args.getFlags('hidden', 'showHidden')
    })

    const output = success ? codeBlock('js', result) : `**ERROR**: ${codeBlock('bash', result)}`
    if (args.getFlags('silent', 's')) return null

    const typeFooter = `**Type**: ${codeBlock('typescript', type)}`

    if (output.length > 2000) {
      const { payload } = await fetch<SpaceBinResponse>(
        'https://spaceb.in/api/v1/documents',
        {
          method: FetchMethods.Post,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: result,
            extension: 'js'
          })
        },
        FetchResultTypes.JSON
      )
      return await message.channel.send(`The output was too long! https://spaceb.in/${payload.id}`)
    }

    return await message.channel.send(`${output}\n${typeFooter}`)
  }

  private async eval(
    // @ts-ignore
    message: Message,
    code: string,
    flags: { async: boolean, depth: number, showHidden: boolean }
  ): Promise<{ result: string, success: boolean, type: string }> {
    if (flags.async) code = `(async () => {\n${code}\n})();`

    let success = true
    let result = null

    try {
      // eslint-disable-next-line no-eval
      result = eval(code)
    } catch (error) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (error && error.stack) {
        this.container.client.logger.error(error)
      }
      result = error
      success = false
    }

    const type = new Type(result).toString()
    if (isThenable(result)) result = await result

    if (typeof result !== 'string') {
      result = inspect(result, {
        depth: flags.depth,
        showHidden: flags.showHidden
      })
    }

    return { result, success, type }
  }
}

interface SpaceBinResponse {
  error: string
  payload: {
    content_hash: string
    id: string
  }
  status: number
}
