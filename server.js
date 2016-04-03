var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var userAgent = require('koa-useragent');

app.use(userAgent());

app.use(function * (next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
  console.log("user-agent: " + this.headers['user-agent']);
});

app.use(serve('static'));

app.use(function *(){
  this.body = 'Hello World';
});

var port = process.env.PORT || 3030;

console.log('App listening at %s', port);

app.listen(port);
