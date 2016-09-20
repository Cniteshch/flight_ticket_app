var express = require('express'),
	app     = express(),
	port    = 8080;

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/partials'));
app.use(express.static(__dirname + '/env' ));
app.use(express.static(__dirname + '/resources' ));

app.listen(port);
console.log('server started on 8080');