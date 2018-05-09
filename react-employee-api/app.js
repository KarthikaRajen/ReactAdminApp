/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load employees route
var employees = require('./routes/employee');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.use(

    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306,
        database:'emp_perf_review'

    },'pool')

);


app.get('/', routes.index);
app.post('/auth', employees.auth);
app.get('/employees', employees.list);
app.get('/employees/add', employees.add);
app.post('/employees/add', employees.save);
app.get('/employees/delete/:id', employees.delete_customer);
app.get('/employees/edit/:id', employees.edit);
app.post('/employees/edit/:id',employees.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
