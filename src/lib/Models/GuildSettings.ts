import { envParseString } from '#lib/env/parser'
import type { GuildSettings as Settings } from '#types'
import { config } from 'dotenv-cra'
import { model, Schema } from 'mongoose'

process.env.NODE_ENV ??= 'development'

config()

const schema = new Schema({
  registeredAt: { type: String, required: false, default: Date.now().toString() },
  guild_id: { required: true, type: String },
  prefix: { required: false, type: String, default: envParseString('PREFIX') },
  language: { required: false, type: String, default: 'en-US' },
  anti: {
    required: false,
    type: Object,
    default: {
      unmentionable: false,
      invites: false,
      gifts: false,
      hoisting: false
    }
  }
})

export default model<Settings>('GuildSettings', schema)
