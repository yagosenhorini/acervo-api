import express from 'express'
import validate from 'express-validation'
import passport from 'passport'
import paramValidation from './auth.validations'
import authCtrl from '../../controllers/auth.controller'

const routeAuth = app =>{
    app.route('/me').get(authCtrl.me)
    app.routeroute('/login').post(validate(paramValidation.login), passport.authenticate('local'), authCtrl.login)
    app.route('/register').post(validate(paramValidation.register), authCtrl.register)
} 

export default routeAuth