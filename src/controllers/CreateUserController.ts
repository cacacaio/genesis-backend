import { Request, Response } from 'express'

import { ErrorHandler } from 'helpers/ErrorHandler'
import admin from 'firebase-admin'

interface ICreateUser {
  email: string
  password: string
  displayName: string
}
export async function CreateUserController(req: Request, res: Response) {
  const { email, password, displayName }: ICreateUser = req.body
  if (!email) throw new ErrorHandler(403, 'Email is required')
  if (!password) throw new ErrorHandler(400, 'Password is required')

  if (!displayName) throw new ErrorHandler(400, 'Display name is required')

  const [, emailProvider] = email.split('@')

  const role = emailProvider.startsWith('tbdarwin') ? 'admin' : ''

  const { uid }: { uid: string } = await admin
    .auth()
    .createUser({ email: email, password: password, displayName: displayName })

  await admin.auth().setCustomUserClaims(uid, { role: role })

  return res.status(201).json({ uid })
}
