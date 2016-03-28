var ChatConnection = require("./ChatConnection.js");
var pornProvider = require("./provider.js");
var config = require("../config.json");

var bot = new ChatConnection(config.url, config.nick, config.channel);
bot.on("chat", function(data)
{
	console.log(data.nick + " : " + data.text);
});
bot.on("info", function (data)
{
	console.log("INFO : " + data.text);
});
bot.on("warn", function (data) {
	console.log("WARN : " + data.text);
});

pornProvider.on("media", function(category, title, url, data)
{
	bot.send("[" + category + "] " + title + " - " + url);
});
pornProvider.on("text", function(category, title, text, data)
{
	bot.send("[" + category + "] " + title + " - http://redd.it/" + data.id);
});

