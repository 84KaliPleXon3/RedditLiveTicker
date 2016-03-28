var EventEmitter = require('events');
var util = require('util');
var request = require("request");

function PornProvider()
{
	EventEmitter.call(this);
	this.subreddits = require("../config.json").subreddits;
	this.nextSubredditIndex = 0;
	this.updateDelay = 5000;
	this.updateCount = {};
	this.lastKnown = {};
	this.lastKnownUtc = {};
	
	this.update();
}
PornProvider.prototype.update = function()
{	
	var index = this.nextSubredditIndex;
	var subs = this.subreddits.slice(index, index + 50).join("+");
	
	this.nextSubredditIndex += 50;
	if(this.nextSubredditIndex > this.subreddits.length)
		this.nextSubredditIndex = 0;
	
	var last = this.lastKnown[index] ? "&before=t3_" + this.lastKnown[index] : "";
	var url = "http://www.reddit.com/r/" + subs + "/new.json?sort=new" + last;
	
	this.updateCount[index] = this.updateCount[index] + 1 || 1;
	this.lastKnownUtc[index] = this.lastKnownUtc[index] || -1;
	
	var self = this;
	request({
		url: url,
		headers: {
			"User-Agent": "nodejs:pornfeed:v0.0.0 (by /u/M4GNV5)"
		}
	}, function(err, resp, body)
	{		
		var timeout;
		
		self.emit("update_raw", resp, body);
		try
		{
			if(err || resp.statusCode != 200)
				throw err || resp.statusCode || new Error("Unknown error");
			
			var data = JSON.parse(body);
			var items = data.data.children;
			var delay = self.updateDelay / (items.length + 1);
			
			self.emit("update", items);
			
			function next(i)
			{
				var item = items[i];
				if(item.kind != "t3")
					return next(i + 1);
					
				if(item.data.created_utc > self.lastKnownUtc[index])
				{
					self.lastKnownUtc[index] = item.data.created_utc;
					self.lastKnown[index] = item.data.id;
				}
				
				if(self.updateCount[index] > 1 || i == 0)
				{
					if(item.data.domain == "self." + item.data.subreddit)
						self.emit("text", item.data.subreddit, item.data.title, item.data.selftext, item.data);
					else
						self.emit("media", item.data.subreddit, item.data.title, item.data.url, item.data);
				}
				
				if(i < items.length - 1)
					timeout = setTimeout(next.bind(null, i + 1), delay);
				else
					timeout = setTimeout(self.update.bind(self), delay);
			}
			
			if(items.length == 0)
				timeout = setTimeout(self.update.bind(self), self.updateDelay);
			else
				next(0);
		}
		catch(e)
		{
			self.emit("error", e, body);
			clearTimeout(timeout);
			setTimeout(self.update.bind(self), self.updateDelay);
		}
	});
};

util.inherits(PornProvider, EventEmitter);

module.exports = new PornProvider();
