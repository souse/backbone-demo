'use strict';

var host = '127.0.0.1';
var port = '5000';

var express = require('express');
var path = require('path');
var app = express();

//设置静态文件夹
app.use(express.static(__dirname)); //目录为 node_js
console.log('__dirname: ' + __dirname);

app.get('/crm', function(req, res) {
	res.sendFile(path.join(__dirname, 'crm-dev', 'index.html'));
});

app.listen(port, host);