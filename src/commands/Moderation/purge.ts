import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message, TextChannel } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  name: 'purge',
  description: 'Makes the bot purge X number of messages',
  requiredClientPermissions: ['MANAGE_MESSAGES'],
  cooldownDelay: 2000,
  cooldownLimit: 2,
  preconditions: ['GuildTextOnly'],
  usage: '<amount>'
})
export default class Purge extends ArielCommand {
  @RequiresUserPermissions('MANAGE_MESSAGES')
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  public async run(message: Message, args: Args): Promise<void | Message> {
    const amount = (await args.pickResult('number')).value

    if (!amount) return await message.channel.send('You didn\'t provide an amount!')
    if (amount > 100) return await message.channel.send('I can only purge 100 messages!')

    await (message.channel as TextChannel).bulkDelete(amount + 1, true)

    return await message.channel.send(`Purged **${amount}** messages`).then(msg => {
      setTimeout(() => {
        void msg.delete()
      }, 2000)
    })
  }
}
