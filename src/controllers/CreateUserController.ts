import { Request, Response } from 'express'

import admin from 'firebase-admin'

type Point = { name: string; email: string; displayName: string }
interface ICreateUser {
  email: string
  password: string
  displayName: string
}
export async function CreateUserController(req: Request, res: Response) {
  const { email, password, displayName }: ICreateUser = req.body
  if (!email) return new Error('Email is required')
  if (!password) return new Error('Password is required')

  if (!displayName) return new Error('Display name is required')

  const [, emailProvider] = email.split('@')

  const role = emailProvider.startsWith('tbdarwin') ? 'admin' : ''

  const { uid }: { uid: string } = await admin
    .auth()
    .createUser({ email: email, password: password, displayName: displayName })

  await admin.auth().setCustomUserClaims(uid, { role: role })

  return res.status(201).json({ uid })
}
