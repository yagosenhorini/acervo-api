import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './src/route/pointsRoutes'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://admin:minu182@mongo-junkyard-gon2z.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

routes(app)

app.listen(PORT, () => {
    console.log(`Servidor atuando na porta ${PORT}`)
})