import { createRouter } from '../Router.js';
import {
    getUser,
    createUser,
    changeUser,
    deleteUser,
} from './user-controller.js';

const route = createRouter();

route.get('/users', getUser);

route.post('/users', createUser);

route.put('/users', changeUser);

route.delete('/users', deleteUser);

export default route;
