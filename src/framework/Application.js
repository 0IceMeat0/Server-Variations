import http from 'node:http';
import EventEmitter from 'node:events';
import { parse } from 'node:url';

export const createApplication = () => {
    const emitter = new EventEmitter();
    const middlewares = [];

    const _createServer = () => {
        return http.createServer((req, res) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                middlewares.forEach(middleware => middleware(req, res));
                const { pathname } = parse(req.url ?? '', true);
                const emitted = emitter.emit(
                    _getRouteMask(pathname ?? '', req.method ?? 'GET'),
                    req,
                    res,
                );
                if (!emitted) {
                    res.statusCode = 404;
                    res.end('Not found');
                }
            });
        });
    };

    const use = middleware => {
        middlewares.push(middleware);
    };

    const listen = (port, callback) => {
        server.listen(port, callback);
    };

    const addRouter = router => {
        Object.keys(router.endpoints).forEach(path => {
            const endpoints = router.endpoints[path];
            Object.keys(endpoints).forEach(method => {
                const handler = endpoints[method];
                emitter.on(_getRouteMask(path, method), (req, res) => {
                    handler(req, res);
                });
            });
        });
    };

    const _getRouteMask = (path, method) => {
        return `[${path}]:[${method}]`;
    };

    const server = _createServer();

    return {
        use,
        listen,
        addRouter,
    };
};
