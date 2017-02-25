var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

var mysql = require('mysql');

app.get('/', function(req, res) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'mohsenhq',
        password: 'mohsenhqw',
        database: 'eram_tickets'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        var queryString = 'SELECT * FROM tickets';

        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;

            for (var i in rows) {
                // console.log('Post Titles: ', rows[i]);
            }
            res.render("home", { apps: rows });

        });

        connection.end();
    });
});

app.get('/Edit/*', function(req, res) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'mohsenhq',
        password: 'mohsenhqw',
        database: 'eram_tickets'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        var queryString = 'SELECT ' + req.params[0] + ' FROM tickets';

        connection.query('UPDATE tickets SET ride = ? Where ride = ?', ['bike', req.params[0]],
            function(err, result) {
                if (err) throw err;
            });
        connection.end();
    });
    res.redirect('/');
});

var server = app.listen(5000, function() {
    console.log('Server is running on port 5000');
});