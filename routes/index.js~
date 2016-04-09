var express = require('express'),
	router = express.Router(),
	path = require('path'),
	__parentdirname = path.dirname(module.parent.filename);

var fs = require('fs');
var http = require('http');

var busArray = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var i = 0;
router.get('/', function(req, res) {
	res.sendFile(__parentdirname + '/public/views/index.html');
});


router.get('/getBus', function(req, res) {
	busArray = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
	if(i < busArray.length)
	{
		busArray[i] = 1;
		i++;
	}
	else
	{
		i =0;
	}
	
	res.send(busArray);

});




module.exports = router;
