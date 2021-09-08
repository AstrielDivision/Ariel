import { Awaited, Piece, PieceContext, PieceOptions } from '@sapphire/framework'

export abstract class Task extends Piece {
  private _interval: NodeJS.Timer | null
  public time: number
  public runOnStart: boolean
  constructor(context: PieceContext, options: TaskOptions) {
    super(context, options)

    this.time = options.time
    this.runOnStart = options.runOnStart ?? false
  }

  public abstract run(...args: readonly unknown[]): Awaited<any>

  public onLoad() {
    this.create()
    return super.onLoad()
  }

  public onUnload() {
    clearInterval(this._interval)
    this._interval = null
  }

  public delete(): Task {
    clearInterval(this._interval)
    return (this._interval = null)
  }

  private create(): NodeJS.Timer | unknown {
    if (!this.time) {
      void this.run()
      return this.delete()
    }
    if (this.runOnStart) void this.run()
    return (this._interval = setInterval(() => {
      void this.run()
    }, 1000 * this.time))
  }
}

export interface TaskOptions extends PieceOptions {
  time?: number
  runOnStart?: boolean
}
