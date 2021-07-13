import { Request, Response } from 'express'

import { ErrorHandler } from 'helpers/ErrorHandler'

export function Error(err: ErrorHandler, req: Request, res: Response) {
  const { status, message } = err

  console.log(err.message)
  return res.status(status).json({ error: message })
}
