import httpStatus from 'http-status'
import passport from 'passport'
import User from '../model/userModel'
import APIError from '../helpers/APIError'

/**
 * Returns passport login response (cookie) when valid username and password is provided
 * @param req
 * @param res
 * @returns {*}
 */

export function login(req, res) {
    return res.json(req.user)
}

/**
 * Returns User when succesfully registered
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

 //Returns a user register
export function register(req, res, next) {
    User.register(new User({
        email: req.body.email
    }), req.body.password, (err, user) => {
        if (err) {
            res.json(err)
            next(err)
        }
        passport.authenticate('local')(req, res, () => {
            res.json({ user })
        })
    })
}

//Returns session
export function sessionOpen(req, res, next){
    if(!req.user){
        const error = new APIError('Erro de autenticação!', httpStatus.UNAUTHORIZED)
        next(error)
    }
    res.json(req.user)
}


//Check authorization
export function checkAuth(req, res, next){
    if(!req.user){
        const error = new APIError('Erro de autenticação', httpStatus.UNAUTHORIZED)
        next(error)
    }
    next()
}