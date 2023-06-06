import type { Logger as VTEXLogger } from '@vtex/api'
import { LogLevel } from '@vtex/api'

export class Logger {
  private readonly logger: VTEXLogger
  private readonly logInProd: boolean

  constructor(logger: VTEXLogger, logInProd = false) {
    this.logger = logger
    this.logInProd = logInProd
  }

  public info = (message: unknown): void => this.log(message, LogLevel.Info)

  public error = (error: unknown): void => this.log(error, LogLevel.Error)

  private log = (message: unknown, type: LogLevel): void => {
    // eslint-disable-next-line no-console
    console.log(message)

    if (this.logInProd) this.logger.log(message, type)
  }
}
