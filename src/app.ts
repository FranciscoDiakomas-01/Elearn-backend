import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import UserRouter from './routes/UserRouter'
import path from 'node:path'

const app = express()

// global middlewares
app.use(cors())
app.use(helmet())
app.use(express.json({ limit : 500}))
app.use(express.urlencoded({extended : true}))
app.use(UserRouter);
app.use(express.static(path.join(process.cwd() , '/uploads')))

export default app