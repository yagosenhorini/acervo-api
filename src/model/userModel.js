import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = Schema({

    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    points: {
        type: Number
    }
});
const User = mongoose.model('acervo-user', userSchema);
export default User

export function createUser(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash
            newUser.save(callback)
        })
    })
}

export function getUserByUsername (username, callback){
    let query = {username: username};
    User.findOne(query, callback);
  }
  
  export function getUserById (id, callback){
    User.findById(id, callback);
  }
  
  export function comparePassword (candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
    });
  }