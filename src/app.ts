import express from 'express'
import helmet from 'helmet'
import cors from 'cors'


const app = express()

// global middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

export default app