
import { Router } from 'express'

const router = Router()

router.post('/Users', CreateUserController)

export { router }
