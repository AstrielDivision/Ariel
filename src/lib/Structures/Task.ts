import { Awaited, Piece, PieceContext, PieceOptions } from '@sapphire/framework'

export abstract class Task extends Piece {
  private _interval: NodeJS.Timer | null
  public time: number
  constructor(context: PieceContext, options: TaskOptions) {
    super(context, options)

    this.time = options.time
  }

  public abstract run(...args: readonly unknown[]): Awaited<any>

  public onLoad() {
    this.create()
    return super.onLoad()
  }

  public onUnload() {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }
  }

  public delete() {
    return clearInterval(this._interval)
  }

  private create(): NodeJS.Timer | unknown {
    if (!this.time) {
      void this.run()
      return this.delete()
    }
    void this.run()
    return setInterval(() => {
      void this.run()
    }, 1000 * this.time)
  }
}

export interface TaskOptions extends PieceOptions {
  time?: number
}
