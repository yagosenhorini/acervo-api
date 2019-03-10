import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './src/route/pointsRoutes'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passportLocal from 'passport-local'
import User, { getUserByUsername, comparePassword, getUserById } from './src/model/userModel'

const app = express()
const PORT = process.env.PORT || 3000
const LocalStrategy = passportLocal.Strategy

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://admin:minu182@mongo-junkyard-gon2z.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }),
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy((username, password, done) => {
    getUserByUsername(username, (err, user) => {
        if (err) throw err
        if (!user) {
            return done(null, false, { message: 'Usuário não encontrado' })
        }
        comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Senha inválida' })
            }
        })
    })
}))

app.use(cors())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user, done) => {
    getUserById(user.id, (err, user) => {
        done(err, user)
    })
})

app.post('/login', passport.authenticate('local'), function(req, res, next){
    res.send(req.user)
    next()
})

app.get('/logout', function(req, res){
    console.log(req.user)
    req.logout()
    res.send(`${req.user} deslogado`)
})

app.get('/user', function(req, res){
    console.log(req.user)
    res.send(req.user)
})

routes(app)

app.listen(PORT, () => {
    console.log(`Servidor atuando na porta ${PORT}`)
})