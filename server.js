var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var dataArr = [];
var analysisData = function dataAnalysis(data){

	console.log("analys",data);
	console.log("count",data[0]+data[1]);
};
var server = http.createServer(function(request, response) {
	console.log('Connection');
	var reqData= "";
	var path = url.parse(request.url).pathname;

	switch (path) {
	case '/sddf':
	    response.writeHead(200, {'Content-Type': 'text/html'});
	    response.write('Hello, World.');
	    response.end();
	    break;
	case '/socket.html':
	    fs.readFile(__dirname + path, function(error, data) {
		    if (error){
			response.writeHead(404);
			response.write("opps this doesn't exist - 404");
		    } else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data, "utf8");
		    }
		    response.end();
		});
	    break;
	default:
		request.on('data',function(data){
			reqData += data;
			console.log("data",data);
		});
		request.on('end',function(){

			if(reqData.length > 0){
				var reqDataArr = JSON.parse(reqData).response;
				console.log("reqDataArr", reqDataArr);
				dataArr = (dataArr.length > 0)? dataArr.concat(reqDataArr):reqDataArr;
				analysisData(dataArr);
				console.log("end",dataArr);	
			}
			
		});
		var rand = [];
		for(var i = 0; i < 6; i++){
			// var num = Math.random()*49 + 1;
			// if(rand.indexOf(num)){
			// 	num = Math.random()*49 +1;	
			// }
			var chkRand = function(rand){
				var temp = Math.round(Math.random() *49 +1);
				return (rand.indexOf(temp)==-1)?temp:chkRand(rand);
			}
			var num = rand.length == 0?Math.round(Math.random()*49 +1): chkRand(rand);
			// if(rand.length == 0){
			// 	rand.push()
			// }
			rand.push(num);

		}
		var responseData = {'response':rand};
	    response.writeHead(200);	    
	    response.write(JSON.stringify(responseData));
	    response.end();
	    break;
	}
    });

server.listen(8080);
io.listen(server);
var serv_io = io.listen(server);
var str = 'hello world';
serv_io.sockets.on('connection', function(socket) {
	// setInterval(function(){
	// 	socket.emit('message', {'message': str});
	// },1000);
        
	socket.on('message',function(msg){ str+= '<br/>'+msg.message;
		  serv_io.sockets.emit('message',{'message':str});
	    });
});






