export const createRouter = () => {
    const endpoints = {};

    const request = (method = 'GET', path, handler) => {
        if (!endpoints[path]) {
            endpoints[path] = {};
        }

        if (endpoints[path][method]) {
            throw new Error(
                `[${method}], по адресу ${path} уже существует метод`,
            );
        }

        endpoints[path][method] = handler;
    };

    const get = (path, handler) => {
        request('GET', path, handler);
    };

    const post = (path, handler) => {
        request('POST', path, handler);
    };

    const put = (path, handler) => {
        request('PUT', path, handler);
    };

    const del = (path, handler) => {
        request('DELETE', path, handler);
    };

    return {
        endpoints,
        get,
        post,
        put,
        delete: del,
    };
};
