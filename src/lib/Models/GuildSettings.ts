import type { GuildSettings as Settings } from '#types'
import { model, Schema } from 'mongoose'

const schema = new Schema({
  registeredAt: { type: String, required: false, default: Date.now().toString() },
  guild_id: { required: true, type: String },
  prefix: { required: false, type: String, default: process.env.PREFIX },
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
  },
  logs: {
    required: false,
    type: Object,
    default: {
      moderation: null,
      members: null
    }
  }
})

export default model<Settings>('GuildSettings', schema)
