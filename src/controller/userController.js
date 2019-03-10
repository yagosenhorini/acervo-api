import mongoose from 'mongoose'
import User, { createUser } from '../model/userModel'
import passport from 'passport'


export function signUp(req, res) {
    let password = req.body.password
    let password2 = req.body.password2

    if(password == password2){
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        createUser(newUser, (err, user)=>{
            if(err) throw err
            res.send(user).end()
        })
        } else{
            res.status(500).send("{errors: \"Senhas não correspondem\"}").end()
        }
}

// export function logout(req, res){
//     console.log(req.user)
//     req.logout()
//     res.send(`${req.user} deslogado`)
// }