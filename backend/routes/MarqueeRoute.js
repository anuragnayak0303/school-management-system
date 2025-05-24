import expres, { Router } from 'express'
import { GetMarquee, marquee } from '../controllers/MarqueeController.js'
import { isSignIn } from '../middlewares/authMiddeware.js'

const MarqueeRoute = expres.Router()
// http://localhost:8000/api/marquee/add
MarqueeRoute.post('/add', isSignIn, marquee)
MarqueeRoute.get('/get', GetMarquee)


export default MarqueeRoute