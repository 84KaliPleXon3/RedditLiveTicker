var pornProvider = require("./provider.js");

pornProvider.on("update", function(items)
{
	console.log("received " + items.length + " items");
});
pornProvider.on("error", function(err, resp, body)
{
	if(body)
		console.log("body: " + body);
	console.log(err);
	console.log(err.stack);
});

require("./web.js");
require("./hackchat.js");