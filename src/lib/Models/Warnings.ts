import { Schema, model } from 'mongoose'
import type { Warnings } from '#types'

const schema = new Schema({
  user: { type: String, required: true },
  mod: { type: String, required: true },
  guild: { type: String, required: true },
  reason: { type: String, required: false, default: 'No reason set.' },
  pardoned: { type: Boolean, required: false, default: false },
  id: { type: String, required: true }
})

export default model<Warnings>('Warnings', schema)
