import type { ILogger, LogLevel } from '@sapphire/framework'
import { MessageAttachment, WebhookClient, WebhookMessageOptions, MessageEmbed } from 'discord.js'
import { EOL } from 'os'
import cfg from '../../config'
import colorette from 'colorette'

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

  protected _write(level: Levels, ...values: readonly unknown[]): void {
    process.stdout.write(
      `[${this.formatLevel('foreground', new Date().toLocaleString())} | ${this.formatLevel(
        'foreground',
        this.namespace + ' Logger'
      )} | ${this.formatLevel(level, level)}]: ${values.join(' ')} ${EOL}`
    )

    if (level === 'LOG') return

    const hook = new WebhookClient({ url: cfg.webhook })

    const embed: MessageEmbed = new MessageEmbed().setTimestamp().setColor('YELLOW')
    const options: WebhookMessageOptions = {
      embeds: [embed],
      username: this.namespace + ' Logger',
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

  formatLevel(level: Levels, text: string): string {
    switch (level) {
      case 'TRACE': {
        return colorette.gray(text)
      }
      case 'INFO': {
        return colorette.greenBright(text)
      }
      case 'DEBUG': {
        return colorette.cyan(text)
      }
      case 'WARN': {
        return colorette.yellow(text)
      }
      case 'FATAL':
      case 'ERROR': {
        return colorette.bgRed(text)
      }
      case 'LOG': {
        return colorette.magenta(text)
      }
      case 'foreground': {
        return colorette.gray(text)
      }
      case 'WRITE': {
        return colorette.dim(text)
      }
    }
  }
}

type Levels = 'TRACE' | 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'FATAL' | 'LOG' | 'foreground' | 'WRITE'
