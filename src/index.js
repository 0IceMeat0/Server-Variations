import { parseUrl } from './framework/parseUrl.js';
import router from './framework/users/user-router.js';
import { createApplication } from './framework/Application.js';
import { jsonParser } from './framework/parsejson.js';

const PORT = process.env.PORT ?? 3000;

const app = createApplication();

app.use(jsonParser);
app.use(parseUrl('http://localhost:5000'));

app.addRouter(router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server start on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};
start();
