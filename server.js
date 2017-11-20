const Koa = require('koa');
const serve = require('koa-static');

const PORT = process.env.port || 80;

const app = new Koa();

app.use(serve(__dirname + '/dist'));
app.listen(PORT);
