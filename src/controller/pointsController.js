import mongoose from 'mongoose'
import pointsModel from '../model/pointsModel'

const Points = mongoose.model('acervo-points', pointsModel)

export function addPoints(req, res) {
    let newPoints = new Points(req.body)
    newPoints.save((error, point) => {
        if (error) {
            res.json(error)
        }
        console.log(point)
        res.json(point)
    })
}

export function listPoints(req, res) {
    Points.find({}, (error, points) => {
        if (error) {
            res.json(error)
        }
        res.json(points)
        console.log(points)
    })
}

export function getUniquePoint(req, res) {
    Points.findById(req.params.id, (error, point) => {
        if (error) {
            res.json(error)
        }
        res.json(point)
    })
}

export function updatePoints(req, res) {
    Points.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, point) => {
        if (error) {
            res.json(error)
        }
        res.json(point)
    })
}

export function deletePoints(req, res) {
    Points.deleteOne({ _id: req.params.id }, (error, point) => {
        if (error) {
            res.json(error)
        }
        res.json(point)
    })
}