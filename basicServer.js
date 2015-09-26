var http = require('http');

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var ejs = require('ejs');
var path = require('path');

var morgan = require('morgan');
var bunyan = require('bunyan');

var app = express();

var log = bunyan.createLogger({
  name: 'basicExpress',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

var PORT = process.env.PORT || 9900;

log.info({}, 'log started');

log.info({port: PORT}, 'server port');
log.info({dirname: __dirname}, '__dirname');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/app', express.static(__dirname + '/public'));


// set up path to web pages
app.set('views', path.join(__dirname, 'views'));

// set express to use ejs templates (with that extension)
//app.set('view engine', 'ejs');

// set express to use jade templates (with that extension)
app.set('view engine', 'jade');

// set express to use ejs templates (with html extension)
//app.engine('html', ejs.renderFile);
//app.set('view engine', 'html');

app.use(morgan('dev'));
//app.use(morgan('combined'));

// specify location of static resources
app.use(express.static('resources'));

app.get('/', function (req, res) {
  log.info({req: req}, '/');
  res.render('home');
  log.info({res: res}, 'home rendered');
});

//app.get('/import/:file',
app.get('/mainArticle',
  getMainArticle
);

function getMainArticle (req, res) {

  console.error("folders db requested");

     //console.error("folders db - sending");

  articleSearch(req, res, "europe%20debate");

  //res.send("blather");
}

function articleSearch (req, res, searchTerm) {
  var searchParam = "&q=" + searchTerm;
  var url = "http://data.bbc.co.uk/bbcrd-juicer/articles?apikey=AlRI0N7WGKM1gH7xVcmiAV2a5TDx5ys2";

  url += searchParam;

  http.get(url, function(response) {
    console.log("Got response: " + res.statusCode);

    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function () {
      var parsed = JSON.parse(body);
      var json = JSON.stringify(parsed.hits);

      res.send(json);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

app.get('/mainArticleSearch/:searchTerm', function (req, res) {
  var searchTerm = req.params.searchTerm;

  articleSearch(req, res, searchTerm);
});

app.get('/noRender', function (req, res) {

  log.info({req: req}, '/');
  log.info({views: app.get('views')}, 'views folder');

  //res.sendFile(__dirname + '/views/home.html');
  res.sendFile(app.get('views') + '/' + 'home.html');
  log.info({res: res}, 'home.html rendered');
});

app.listen(PORT);
