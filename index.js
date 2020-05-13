const app = require('./server.js');


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`bk: index.js: app.listen: \n*** listening on http://localhost:${PORT} ***\n`);
});