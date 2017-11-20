const Koa = require('koa');
const serve = require('koa-static');

const PORT = process.env.port || 3000;

const app = new Koa();

app.use(serve(__dirname + '/dist'));
app.listen(PORT);
