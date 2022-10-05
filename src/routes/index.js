import LoginController from '../controllers/LoginController';
import version1Router from './version1/index';

const initWebRouter = (app) => {
    app.post('/login', LoginController.userLogin);
    app.use('/api/v1', version1Router);
};

module.exports = initWebRouter;
