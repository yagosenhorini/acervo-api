import { addPoints, listPoints, getUniquePoint, deletePoints, updatePoints, doLogin } from '../controller/pointsController'
import { signUp, login, getUser, logout } from '../controller/userController';
const routes = app => {

    app.route('/register')
        .post(signUp)

    // app.route('/login')
    //     .post(login)
    
    app.route('/v1/points')
        .post(addPoints)
        .get(listPoints)

    app.route('/v1/points/:id')
        .get(getUniquePoint)
        .put(updatePoints)
        .delete(deletePoints)
}

export default routes;