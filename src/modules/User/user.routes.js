import { Router } from "express";
import * as UC from './user.controller.js'

const router = Router()



router.post('/', UC.signUp)
router.post('/signin', UC.signin)
router.put('/update', UC.updateAccount)
router.delete('/', UC.deleteAccount)
router.get('/:_id', UC.getUserData)





export default router