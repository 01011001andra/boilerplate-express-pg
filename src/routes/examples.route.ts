import { Router, type Request, type Response } from 'express'

const barangRouter = Router()

barangRouter.get('/examples', (req: Request, res: Response) => {
  res.json({ status: true })
})

export default barangRouter
