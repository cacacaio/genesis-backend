import 'express-async-errors'

import * as admin from 'firebase-admin'

import express, { NextFunction, Request, Response } from 'express'

import { ErrorHandler } from 'helpers/ErrorHandler'
import { router } from './routes'

var account = require('../genesis-4259d-firebase-adminsdk-ju28b-f76e9dba42')
admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://genesis-4259d-default-rtdb.firebaseio.com/',
})
const app = express()
app.use(express.json())
app.use(router)
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err
  console.log('Chegou')
  console.log(status, message)
  console.log(res)
  return res.status(status).json({ error: message })
})
app.listen(3001, () => {
  console.log('listening on port 3001')
})
