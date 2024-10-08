import { Router } from 'express'
import * as db from '../db/collections'
import checkJwt, { JwtRequest } from '../auth0'
import { StatusCodes } from 'http-status-codes'
const router = Router()

// router.get('/', async (req: JwtRequest, res) => {
//   const user = req.auth ? req.auth.sub : undefined
//   console.log('auth: ', user)

//   console.log('req: ', req.auth)
//   try {
//     // const authId = String(req.auth?.sub)

//     const collections = await db.getCollections(String(user))
//     res.json(collections)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Error getting collections' })
//   }
// })

// router.post('/', checkJwt, async (req: JwtRequest, res) => {
//   try {
//     const data = req.body
//     const authId = String(req.auth?.sub)
//     // const newCollection = { name: data.name, user_id: authId }
//     const newCollection = { name: data.name, userId: authId }

//     await db.addCollection(newCollection)
//     res.setHeader('Location', req.baseUrl).sendStatus(StatusCodes.CREATED)
//   } catch (error) {
//     res.status(500)
//   }
// })

//try with hardcoded id temporarily

const id = 'auth0|6653f73c8c6a4833399fb2cd'

router.get('/', async (req, res) => {
  try {
    const collections = await db.getCollections(id)
    res.json(collections)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting collections' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newCollection = { name: data.name, userId: id }

    await db.addCollection(newCollection)
    res.setHeader('Location', req.baseUrl).sendStatus(StatusCodes.CREATED)
  } catch (error) {
    res.status(500).json({ message: "couldn't add the collection" })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteCollection(id)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
