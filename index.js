var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var dataRoutes = require('./data/routes');
    var roleSchema = require("./model/RoleSchema")

    // configuration =================

    // Connect to our mongo database
    mongoose.connect('mongodb://localhost/portfolio');


    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.get('/data/roles', dataRoutes.index);
    app.post('/data/roles', function(req, res){
        var rs = new roleSchema(req.body);

        rs.save( function(error, data){
            if(error){
                res.json(error);
            }
            else{
                res.json(data);
            }
        });
    });


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");