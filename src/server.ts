import * as admin from 'firebase-admin'

import { ErrorHandler } from './middlewares/error'
import express from 'express'
import { router } from './routes'

var account = require('../genesis-4259d-firebase-adminsdk-ju28b-f76e9dba42')

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://genesis-4259d-default-rtdb.firebaseio.com/',
})
const app = express()
app.use(express.json())
app.use(router)
app.use(ErrorHandler)
app.listen(3001, () => {
  console.log('listening on port 3001')
})
