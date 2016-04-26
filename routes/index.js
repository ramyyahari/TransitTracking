var express = require('express'),
    router = express.Router(),
    path = require('path'),
    __parentdirname = path.dirname(module.parent.filename);

//required to read files and hhtp request
var fs = require('fs');
var http = require('http');

var lineReader = require('readline').createInterface({
    terminal: false, input: require('fs').createReadStream('BusRoutesLog/SatNorth.txt')
});

var SatRouteCoords = [];


//Saturday Route 
var SaturdayNorth = [
    {"stopnum": 1, "lat": 46.7324183, "long": -117.1658558, "stopname": "Campus & Thatuna"},
    {"stopnum": 2, "lat": 46.733531, "long": -117.162168, "stopname": "Colorado @ Gyms"},
    {"stopnum": 3, "lat": 46.735595, "long": -117.159285, "stopname": "Orchard @ Beasley"},
    {"stopnum": 4, "lat": 46.7367137, "long": -117.1567447, "stopname": "Rec. Center"},
    {"stopnum": 5, "lat": 46.7399148, "long": -117.156244, "stopname": "Valley & Orchard"},
    {"stopnum": 6, "lat": 46.7400558, "long": -117.1581545, "stopname": "Valley & Merman"},
    {"stopnum": 7, "lat": 46.7434202, "long": -117.1545188, "stopname": "Merman & Terre View"},
    {"stopnum": 8, "lat": 46.746475, "long": -117.1516163, "stopname": "Cougar Crest"},
    {"stopnum": 9, "lat": 46.7476625, "long": -117.1508887, "stopname": "Pine Ridge"},
    {"stopnum": 10, "lat": 46.7483202, "long": -117.1477387, "stopname": "Birch Hill"},
    {"stopnum": 11, "lat": 46.7463945, "long": -117.1453407, "stopname": "Maple Valley"},
    {"stopnum": 12, "lat": 46.744069, "long": -117.1483385, "stopname": "Aspen Village"},
    {"stopnum": 13, "lat": 46.7423278, "long": -117.1519197, "stopname": "Campus & Thatuna"},
    {"stopnum": 14, "lat": 46.7429638, "long": -117.1550187, "stopname": "Campus & Thatuna"},
    {"stopnum": 15, "lat": 46.7441113, "long": -117.1579432, "stopname": "Campus & Thatuna"},
    {"stopnum": 16, "lat": 46.7440777, "long": -117.1613008, "stopname": "Campus & Thatuna"},
    {"stopnum": 17, "lat": 46.746384, "long": -117.168428, "stopname": "Campus & Thatuna"},
    {"stopnum": 18, "lat": 46.7436792, "long": -117.1652528, "stopname": "Campus & Thatuna"},
    {"stopnum": 19, "lat": 46.7464817, "long": -117.168495, "stopname": "Campus & Thatuna"},
    {"stopnum": 20, "lat": 46.7486937, "long": -117.1696635, "stopname": "Campus & Thatuna"},
    {"stopnum": 21, "lat": 46.7513225, "long": -117.1639445, "stopname": "Campus & Thatuna"},
    {"stopnum": 22, "lat": 46.748649, "long": -117.169733, "stopname": "Campus & Thatuna"},
    {"stopnum": 23, "lat": 46.7400608, "long": -117.163331, "stopname": "Campus & Thatuna"},
    {"stopnum": 24, "lat": 46.738585, "long": -117.167542, "stopname": "Campus & Thatuna"},
    {"stopnum": 25, "lat": 46.7406685, "long": -117.1592638, "stopname": "Campus & Thatuna"},
    {"stopnum": 26, "lat": 46.7398847, "long": -117.1639573, "stopname": "Campus & Thatuna"},
    {"stopnum": 27, "lat": 46.738544, "long": -117.167604, "stopname": "Campus & Thatuna"},
    {"stopnum": 28, "lat": 46.7393287, "long": -117.1713687, "stopname": "Campus & Thatuna"},
    {"stopnum": 29, "lat": 46.740118, "long": -117.1724985, "stopname": "Campus & Thatuna"},
    {"stopnum": 30, "lat": 46.7472767, "long": -117.1741057, "stopname": "Campus & Thatuna"},
    {"stopnum": 31, "lat": 46.7466655, "long": -117.1780345, "stopname": "Campus & Thatuna"},
    {"stopnum": 32, "lat": 46.7451827, "long": -117.1804043, "stopname": "Campus & Thatuna"},
    {"stopnum": 33, "lat": 46.743614, "long": -117.17887, "stopname": "Campus & Thatuna"},
    {"stopnum": 34, "lat": 46.7423455, "long": -117.1787028, "stopname": "Campus & Thatuna"},
    {"stopnum": 35, "lat": 46.7410585, "long": -117.1790207, "stopname": "Campus & Thatuna"},
    {"stopnum": 36, "lat": 46.7389915, "long": -117.178351, "stopname": "Campus & Thatuna"},
    {"stopnum": 37, "lat": 46.7397843, "long": -117.1730963, "stopname": "Campus & Thatuna"},
    {"stopnum": 38, "lat": 46.7286723, "long": -117.1619125, "stopname": "Campus & Thatuna"},
    {"stopnum": 39, "lat": 46.7365097, "long": -117.1633323, "stopname": "Campus & Thatuna"},
    {"stopnum": 40, "lat": 46.7293213, "long": -117.1686792, "stopname": "Campus & Thatuna"},
    {"stopnum": 41, "lat": 46.7343493, "long": -117.1590533, "stopname": "Campus & Thatuna"},
    {"stopnum": 42, "lat": 46.73142, "long": -117.1590135, "stopname": "Campus & Thatuna"},
    {"stopnum": 43, "lat": 46.7286083, "long": -117.1620867, "stopname": "Campus & Thatuna"},
    {"stopnum": 44, "lat": 46.7277985, "long": -117.1687703, "stopname": "Campus & Thatuna"},
    {"stopnum": 45, "lat": 46.7316907, "long": -117.1684215, "stopname": "Campus & Thatuna"},
    {"stopnum": 46, "lat": 46.7317532, "long": -117.1684135, "stopname": "Campus & Thatuna"}

];


/*SaturdayNorth.forEach(function(entry){
 console.log(entry);
 })*/
var busArray = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var i = 0;
router.get('/', function (req, res) {
    res.sendFile(__parentdirname + '/public/views/index.html');
});


router.get('/getBus', function (req, res) {
    busArray = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    if (i < busArray.length) {
        busArray[i] = 1;
        i++;
    }
    else {
        i = 0;
    }

    res.send(busArray);

});


//GetCoordinates();

//most likely be writing the parser function here
function GetCoordinates() {
    //var newarr[50];
    var oldlat;
    var oldlong;

    lineReader.on('line', function (line) {
        //busArray = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        //read from our routes file
        //parse lat and long
        //check lat and long with our bus route dict
        //mark 1 if within bounds
        var newstr = line.slice(55, 80);
        var aftersplit = newstr.split(',');
        var latnlong = {"lat": aftersplit[0], "long": aftersplit[1]};
        //newarr.push(latnlong);
        SaturdayNorth.forEach(function (entry) {
            if (Math.abs(entry.lat - aftersplit[0]) < 0.00025 && Math.abs(entry.long - aftersplit[1]) < 0.00025 && aftersplit[0] != oldlat && aftersplit[1] != oldlong) {
                busArray[entry.stopnum - 1] = 1;
                console.log("stop nuber: " + entry.stopnum);
                console.log(busArray);
                oldlat = aftersplit[0];
                oldlong = aftersplit[1];
            }

            // console.log(entry);
        });


        //console.log('Line from file:', latnlong);
    });


}


function getSatNorth() {
    var http = require('http');
    var str = '';

    var options = {
        host: 'pullman.mapstrat.com',
        path: '/nextvehicle/BusLocator.axd?&ShapeIDs=,41'//saturdayNorth
    };

    callback = function (response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(req.data);
            console.log(str);
            // your code here if you want to use the results !
            //we should have our final strings here
            //should save this string to route
            if (str == "PlotBusLocations([]);") {
                console.log('no output');
                return;
            }
            str += "\n"
            fs.appendFile("BusRoutesLog/SatNorth.txt", str, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    }

//making the call, we need this here so it can do a call back
    var req = http.request(options, callback).end();

}


function getSatSouth() {
    var http = require('http');
    var str = '';

    var options = {
        host: 'pullman.mapstrat.com',
        path: '/nextvehicle/BusLocator.axd?&ShapeIDs=,42'//saturdaySouth
    };

    callback = function (response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(req.data);
            console.log(str);
            // your code here if you want to use the results !
            //we should have our final strings here
            //should save this string to route
            if (str == "PlotBusLocations([]);") {
                console.log('no output');
                return;
            }
            str += "\n"
            fs.appendFile("BusRoutesLog/SatSouth.txt", str, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    }

//making the call, we need this here so it can do a call back
    var req = http.request(options, callback).end();

}


function RealGetSatNorth() {
    var http = require('http');
    var str = '';

    var options = {
        host: 'pullman.mapstrat.com',
        path: '/nextvehicle/BusLocator.axd?&ShapeIDs=,41'//saturdayNorth
    };

    callback = function (response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(req.data);
            //console.log(str);
            // your code here if you want to use the results !
            //we should have our final strings here
            //should save this string to route
            if (str == "PlotBusLocations([]);") {
                console.log('no output');
                return;
            }
            str += "\n"

            //add parser here
            var oldlat;
            var oldlong;
            var newstr = str.slice(55, 80);
            var aftersplit = newstr.split(',');
            var latnlong = {"lat": aftersplit[0], "long": aftersplit[1]};
            //newarr.push(latnlong);
            SaturdayNorth.forEach(function (entry) {
                if (Math.abs(entry.lat - aftersplit[0]) < 0.00025 && Math.abs(entry.long - aftersplit[1]) < 0.00025 && aftersplit[0] != oldlat && aftersplit[1] != oldlong) {
                    busArray[entry.stopnum - 1] = 1;
                    console.log("stop nuber: " + entry.stopnum);
                    console.log(busArray);
                    oldlat = aftersplit[0];
                    oldlong = aftersplit[1];
                    console.log('<------------------------------------------------------------------------------------------------------------>');
                    fs.appendFile("BusRoutesLog/log.txt", entry.stopnum + ' - ', function (err) {
                        if (err) {
                            return console.log(err);
                        }

                        console.log("The file was saved!");
                    });
                }
                else
                {
                    //console.log("Probably dup. did not save");

                }

                // console.log(entry);
            });


        });
    }

//making the call, we need this here so it can do a call back
    var req = http.request(options, callback).end();

}


setInterval(RealGetSatNorth, 1000)
// setInterval(getSatNorth, 5000)
module.exports = router;
