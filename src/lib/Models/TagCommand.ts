import type { TagCommand } from '#types'
import { model, Schema } from 'mongoose'

const schema = new Schema({
  registeredAt: { type: String, required: false, default: Date.now().toString() },
  guild_id: { type: String, required: true },
  name: { type: String, required: true },
  data: { type: String, required: true }
})

export default model<TagCommand>('Tags', schema)
