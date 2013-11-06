var fs 		= require("fs"); 
var express = require("express"); 
var config  = JSON.parse(fs.readFileSync("config.json")); 
var host = config.host; 
var port = config.port; 
var app = express(); 
var server = require('http').createServer(app).listen(port, host); 
var io = require('socket.io').listen(server); 
var twitter = require('twitter'); 

// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("lmalcom", "myFirstApp", '416c04de-c78c-44bd-9');
var Twitter = require("temboo/Library/Twitter/Search");
var tweetsChoreo = new Twitter.Tweets(session);

//Instantiate the twitter component
//You will need to get your own key. Don't worry, it's free. But I cannot provide you one
//since it will instantiate a connection on my behalf and will drop all other streaming connections.
//Check out: https://dev.twitter.com/
var t = new twitter({
    consumer_key: 'N5iOjfKyXjIh0ToHVPRGIQ',           // <--- FILL ME IN
    consumer_secret: 'D7RDJjNsVuozQtq2TQBhHVyW5ehhnmZdSchwIbhsAk',        // <--- FILL ME IN
    access_token_key: '1110718519-EdtUXf4gudvkynHjpx5Lt4LvR3MycHUHfDRJ7WU',       // <--- FILL ME IN
    access_token_secret: 'bqOctAhzULJ4r3bkw1Vvya0qy8alp2Ak6pYfsklDtqc'     // <--- FILL ME IN
});

//basic settings 
app.configure(function(){	
	app.use(express.cookieParser()); 
	app.use(express.session({secret: 'secret variable that gets hashed, omg!'})); 
	app.use(express.bodyParser()); 
	app.use(express.methodOverride()); 
	app.use(app.router); 
	app.use(express.static(__dirname));  
}); 

//regular static pages
app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');	
}); 
app.get('/search', function(req, res){
	res.sendfile(__dirname + '/index.html');	
}); 
app.get('/search/:query', function(req, res){
	res.sendfile(__dirname + '/index.html');	
}); 
app.get('/city', function(req, res){
	res.sendfile(__dirname + '/index.html');	
}); 

app.get('/query/:query', function(req, res){
	if (typeof req.params.query === 'undefined') res.send('no query set'); 

	var query = req.params.query; 

	// Instantiate and populate the input set for the choreo
	var tweetsInputs = tweetsChoreo.newInputSet();

	// Set credential to use for execution 
	tweetsInputs.setCredential('Twitter'); 

	// Set inputs 
	tweetsInputs.set_Count("200");
	tweetsInputs.set_Query(query); 

	// Run the choreo, specifying success and error callback handlers 
	tweetsChoreo.execute( 
	    tweetsInputs, 
	    function(results){res.send(results.get_Response());}, 
	    function(error){console.log(error.type); console.log(error.message);} 
	);
}); 
app.get('/streaming', function(){
	res.sendfile(__dirname + '/index.html');
});
app.get('/streaming/:query', function(req, res){
	var query = req.params.query; 
	
	 
	//Tell the twitter API to filter on the watchSymbols 
	if(!t.stream){
		t.stream('statuses/filter', { track: [query] }, function(stream) {
		 
		  //We have a connection. Now watch the 'data' event for incomming tweets.
		  stream.on('data', function(tweet) {
		 
		    //This variable is used to indicate whether a symbol was actually mentioned.
		    //Since twitter doesnt why the tweet was forwarded we have to search through the text
		    //and determine which symbol it was ment for. Sometimes we can't tell, in which case we don't
		    //want to increment the total counter...
		    var claimed = false;
		 
		    //Make sure it was a valid tweet
		    if (tweet.text !== undefined) {
		 
		      //We're gunna do some indexOf comparisons and we want it to be case agnostic.
		      var text = tweet.text.toLowerCase();
		 
		      //Send to all the clients
		      sockets.sockets.emit('data', {text: tweet.text});
		    }
		  });
		});
	}else{
		console.log('already streaming'); 
	}
	res.send('streaming!'); 
}); 



