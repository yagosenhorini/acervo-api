import { addPoints, listPoints, getUniquePoint, deletePoints, updatePoints } from '../controller/pointsController'

const routes = app => {
    app.route('/v1/points')
        .post(addPoints)
        .get(listPoints)

    app.route('/v1/points/:id')
        .get(getUniquePoint)
        .put(updatePoints)
        .delete(deletePoints)
}

export default routes;