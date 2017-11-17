const Koa = require('koa');
const serve = require('koa-static');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = new Koa();

app.use(serve(__dirname + '/dist'));
app.listen(PORT, HOST);

console.log('listening on port 3000');
