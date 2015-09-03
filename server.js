	var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var dataRoutes = require('./data/routes');


    // configuration =================

    // Connect to our mongo database
    mongoose.connect('mongodb://admin:E6kzV_KQauB3@localhost/portfolio2015');
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.get('/data/roles', dataRoutes.read);
    app.post('/data/roles', dataRoutes.create);
    app.delete('/data/roles/:id', dataRoutes.delete);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	var http = require('http');

	app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
	app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");


	http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
		console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
		server();
	});
    console.log("App listening");