var express = require('express');
var app = express();
app.get('/',function(req,res){ res.end('hellow');});
app.listen(8080);