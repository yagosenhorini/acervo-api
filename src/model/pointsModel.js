import mongoose from 'mongoose'
const Schema = mongoose.Schema

const pointsModel = Schema({
   
    name:{
        type: String,
        required: false
    },
    points: {
        type: Number,
        required: false
    }
});

export default pointsModel;