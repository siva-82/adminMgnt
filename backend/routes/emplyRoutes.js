import express from 'express'
import { getEmplyProfile,getEmplys} from '../controller/userController.js'  
const router =express.Router()


router.get('/getEmplys',getEmplys)

router.route('/:id').get(getEmplyProfile)
 
export default router