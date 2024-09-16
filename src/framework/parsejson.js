export const jsonParser = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.send = data => {
        res.end(JSON.stringify(data));
    };
};
