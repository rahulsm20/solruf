import express from 'express'
const router = express.Router()
import {getAssets,updateAsset,deleteAsset,addAsset} from '../controllers/assets'  
import auth from '../middleware/auth'
router.get('/',auth,getAssets)
router.post('/add',auth,addAsset)
router.delete('/delete',auth,deleteAsset)
router.patch('/patch',auth,updateAsset)
export default router