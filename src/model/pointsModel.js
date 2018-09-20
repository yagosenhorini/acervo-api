import mongoose from 'mongoose'
const Schema = mongoose.Schema

const pointsModel = Schema({
   
    id:{
        type: Number,
        required: 'Código de identificação obrigatório'
    },
    name:{
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

export default pointsModel;