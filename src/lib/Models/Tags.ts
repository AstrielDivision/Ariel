import type { Tag } from '#types'
import { model, Schema } from 'mongoose'

const schema = new Schema({
  registeredAt: { type: String, required: false, default: Date.now().toString() },
  guild_id: { type: String, required: true },
  name: { type: String, required: true },
  data: { type: String, required: true },
  color: { type: String, required: false },
  embed: { type: Boolean, required: false, default: false }
})

export default model<Tag>('Tags', schema)
