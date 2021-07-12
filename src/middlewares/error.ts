import { Request, Response, response } from 'express'

export function ErrorHandler(err: Error, req: Request, res: Response) {
  if (err instanceof Error) {
    console.log(err.message)
    return response.status(400).json({ error: err.message })
  }
  return response.status(500).json({ error: 'Unhandled Error Caught' })
}
