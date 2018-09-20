import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './src/route/pointsRoutes'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import APIError from './src/helpers/APIError'
import User from './src/model/userModel'

const app = express()
const PORT = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://admin:minu182@mongo-junkyard-gon2z.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
    session({
        secret: 'stayhungrystayfoolish',
        resave: true,
        saveUninitialized: true
    }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())
app.use(cors())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


routes(app)

app.listen(PORT, () => {
    console.log(`Servidor atuando na porta ${PORT}`)
})