import { model, Schema } from 'mongoose'
import type { GuildSettings as Settings } from '#types'
import cfg from '../../config'

const schema = new Schema({
  registeredAt: { type: String, required: false, default: Date.now().toString() },
  guild_id: { required: true, type: String },
  prefix: { required: false, type: String, default: cfg.prefix },
  anti: {
    required: false,
    type: Object,
    default: {
      unmentionable: false,
      invites: false,
      gifts: false
    }
  }
})

export default model<Settings>('GuildSettings', schema)
