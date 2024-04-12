
import { Router } from "express";
import * as mc from './message.controller.js'
const router = Router()


router.post('/', mc.sendMessage)

router.get('/', mc.listAllMessages)

router.put('/', mc.markedMessage)

router.delete('/', mc.deletemessage)

export default router