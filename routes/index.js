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



function getSatNorth(){
    var http = require('http');
    var str = '';

    var options = {
        host: 'pullman.mapstrat.com',
        path: '/nextvehicle/BusLocator.axd?&ShapeIDs=,41'//saturdayNorth
    };

    callback = function(response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(req.data);
            console.log(str);
            // your code here if you want to use the results !
            //we should have our final strings here
            //should save this string to route
            if(str == "PlotBusLocations([]);")
            {
                console.log('no output');
                return;
            }
            str += "\n"
            fs.appendFile("BusRoutesLog/SatNorth.txt", str, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    }

//making the call, we need this here so it can do a call back
    var req = http.request(options, callback).end();

}


function getSatSouth(){
    var http = require('http');
    var str = '';

    var options = {
        host: 'pullman.mapstrat.com',
        path: '/nextvehicle/BusLocator.axd?&ShapeIDs=,42'//saturdaySouth
    };

    callback = function(response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(req.data);
            console.log(str);
            // your code here if you want to use the results !
            //we should have our final strings here
            //should save this string to route
            if(str == "PlotBusLocations([]);")
            {
                console.log('no output');
                return;
            }
            str += "\n"
            fs.appendFile("BusRoutesLog/SatSouth.txt", str, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    }

//making the call, we need this here so it can do a call back
    var req = http.request(options, callback).end();

}

// setInterval(getSatSouth, 5000)
// setInterval(getSatNorth, 5000)
module.exports = router;
