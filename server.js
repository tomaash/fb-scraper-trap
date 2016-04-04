var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var userAgent = require('koa-useragent');
var handlebars = require("koa-handlebars");

app.use(handlebars({
  defaultLayout: "main"
}));

app.use(userAgent());

app.use(function * (next){
	// this.response.status = 404;
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
  console.log("user-agent: " + this.headers['user-agent']);
  if (this.status == 404) {
  	this.body = undefined;
  }
});

app.use(serve('static'));

app.use(function *() {
	var name = this.url.replace("/","");
	if (this.url.match("404")) {
		this.response.status = 404;
	}
  yield this.render("index", {
    title: name,
    name: name
  });
});

app.use(function *(){
	console.log(this.request.url);
  this.body = 'Hello World';
});

var port = process.env.PORT || 3030;

console.log('App listening at %s', port);

app.listen(port);
