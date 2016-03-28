var http = require("http");
var fs = require("fs");
var WebSocketServer = require("ws").Server;
var pornProvider = require("./provider.js");
var config = require("../config.json");

var cache = [];
var wss = new WebSocketServer({port: config.wsPort});
wss.on("connection", function(socket)
{
	cache.forEach(function(obj)
	{
		socket.send(JSON.stringify(obj));
	});
});
wss.broadcast = function(obj)
{
	cache.push(obj);
	if(cache.length > 5)
		cache.splice(0, 1);
		
	var msg = JSON.stringify(obj);
	this.clients.forEach(function(socket)
	{
		if(socket.readyState == 1)
			socket.send(msg);
	});
};

pornProvider.on("media", function(category, title, url, data)
{
	wss.broadcast({category: category, title: title, url: url, id: data.id});
});
pornProvider.on("text", function(category, title, text, data)
{
	wss.broadcast({category: category, title: title, text: text, id: data.id});
});

var html = fs.readFileSync("./webpage.html");
http.createServer(function(req, res)
{
    if(req.url == "/")
        res.end(fs.readFileSync("./webpage.html"));
    else
        res.end("foo u theres nuthin here");
}).listen({port: config.httpPort});