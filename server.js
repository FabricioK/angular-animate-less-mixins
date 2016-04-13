/* global process */
/* global __dirname */
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = http.createServer(app)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'master')));
app.set('/views', express.static(__dirname + '/public'));
app.use('/dist', express.static(__dirname + '/dist'));

app.engine('html', require('ejs').renderFile);

app.get('/', function (request, response) {
    response.render('index.html');
});

server.listen(server_port, server_ip_address);
console.log('rodando na porta: ' + server_port);