var express = require('express');
var session = require('express-session');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var menu = require('./routes/menu');

var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  console.log("Hit: "+req.url);
  next();
});
/*
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

app.use(function(req, res, next) {
  let uri= req.url;

  if(!(uri=== "/" || uri.startsWith("/menu") || uri.startsWith("/health") || uri.startsWith("/car") || uri.startsWith("/model") || uri.startsWith("/images/") || uri.startsWith("/js/") || uri.startsWith("/cc"))) {
    console.log("Proxy Kibana: "+req.url);
 
    if(uri.includes("/service/elastic/kibana/")) {
      req.url= uri.substring("/service/elastic/kibana/".length);
      console.log("Effective Proxy Kibana: "+req.url);  
    }
  
    proxy.web(req, res, { target: 'http://elastic:changeme@kibana.elastic.l4lb.thisdcos.directory:5601' });
    return;
  } 

   if((uri.includes("logout") && !uri.includes("images/logout"))) {
     console.log("Kibana logout");
     res.writeHead(301,
      {Location: '/'}
    );
    res.end();
    return;
   }
   next();
});
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.text({type: '*/*'}));
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/menu', menu);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
