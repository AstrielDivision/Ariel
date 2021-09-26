import type { ILogger, LogLevel } from '@sapphire/framework'
import { MessageAttachment, MessageEmbed, WebhookClient, WebhookMessageOptions } from 'discord.js'
import { EOL } from 'os'
import cfg from '../../config'

export default class AstraeaLogger implements ILogger {
  private readonly loglevel: LogLevel
  constructor(private readonly namespace: string) {}

  has(level: LogLevel): boolean {
    return level >= this.loglevel
  }

  trace(...message: unknown[]): void {
    this._write('TRACE', message)
  }

  info(...message: unknown[]): void {
    this._write('INFO', message)
  }

  debug(...message: unknown[]): void {
    this._write('DEBUG', message)
  }

  warn(...message: unknown[]): void {
    this._write('WARN', message)
  }

  error(...message: unknown[]): void {
    this._write('ERROR', message)
  }

  fatal(...message: unknown[]): void {
    this._write('FATAL', message)
  }

  write(...message: unknown[]): void {
    this._write('WRITE', message)
  }

  /**
   * Will not be sent through the Webhook
   * @param message Message to log
   */
  console(...message: unknown[]): void {
    this._write('LOG', message)
  }

  protected _write(level: string, ...values: readonly unknown[]): void {
    process.stdout.write(
      `[${new Date().toLocaleString()} | ${this.namespace} Logger | ${level}]: ${values.join('')} ${EOL}`
    )

    if (level === 'LOG') return

    const hook = new WebhookClient({ url: cfg.webhook })

    const embed: MessageEmbed = new MessageEmbed()
      .setTitle(`[${this.namespace} | ${level}]`)
      .setTimestamp()
      .setColor('YELLOW')

    const options: WebhookMessageOptions = {
      embeds: [embed],
      username: `${this.namespace} | Logs.`,
      avatarURL: 'https://lazy.devswhofuckdevs.xyz/55vQ3rlwU.png'
    }

    if (values.length < 2048) {
      embed.setDescription(values.join(' '))
    } else {
      embed.setDescription('Message too long.')
      options.files = [new MessageAttachment(Buffer.from(values.join(' ')), 'message.txt')]
    }
    void hook.send(options).catch(() => null)
  }
}
