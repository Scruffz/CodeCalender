var express = require('express');
var app = express();
var path = require('path');
var data = require('./data/mockData.json')

//overwriting data for test purposes

const today = new Date();
const tomorrow = new Date(today.getTime() + 93600000);
const dayAfter = new Date(tomorrow.getTime() + 82800000);

data = {
	"events": [
	{
		"title": "Dog walking, advanced class",
		"date": today.toString(),
		"description": [
			"Dogs will walk you for 1 hour whilst you bring them tennis balls",
			"Come join the whimsical sniffs and smells of Princes Gardens while our dogs idly slump by playing Pokemon Go.",
			"Ball rental £5 deposit"],
		"hosts": ["Rover","Fido"]
	},
	{
		"title": "Codebase Weekly Yoga",
		"date": today.toString(),
		"description": [
			"Bring your mat and some water for some stretching, de-stressing and exercise. For information, see Reception.",
			"£8 drop in £45 for six sessions. 1PM, Bruntsfield Links",
			"Weekly Yoga exercise classes for CodeBase tenants.", 
			"Master your breath, let the self be in bliss, contemplate on the sublime within you. T.Krishnamachary."
		],
		"hosts": []
	},
	{
		"title": "Weekly Fight Club at the underground parking lot (East-End)",
		"date": tomorrow.toString(),
		"description": ["Noone talks about it", "No, seriously, we don't", "Stop asking."],
		"hosts": ["Fight Club inc."]
	},
	{
		"title": "Scottish blockchain meetup",
		"date": dayAfter.toString(),
		"description": ["We're still in the early days of what could prove to be one of the most important innovations since the early days of the internet. The group is open to everyone involved in the blockchain and Bitcoin communities and those that aren't. Experts, amateurs, miners, critics, whoever. If you're interested, you're welcome.",
			"We're an inclusive bunch - come along and find out what's going on in the Scottish scene from those that are at the heart of the activity."],
		"hosts": ["Greig Paul"]
	}
]
}




app.use(express.static('client/build'));

app.listen(3000, function(){

  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  app.get('/api/events', function(req, res){
  	res.send(data)
  })

  console.log('App running on port ' + this.address().port);
});

