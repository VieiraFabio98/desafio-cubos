import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import '@shared/container'
import { router } from './routes'

const app = express()

// @ts-ignore
app.use(express.json( { limit: '250mb' } ))

const options: cors.CorsOptions = {
  origin: "http://localhost:3000", // ou a URL exata do seu frontend
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}

app.use(cors(options))

app.use(router)


export { app }