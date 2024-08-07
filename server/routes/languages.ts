import { Router } from 'express'
const router = Router()
import * as db from '../db/languages'

router.get('/', async (req, res) => {
  try {
    const languages = await db.allLanguages()
    res.status(200).json(languages)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
