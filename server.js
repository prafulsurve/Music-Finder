var http = require('http');
var fs = require('fs');
var mime = require('mime');
var extract = require('./extract');

var handleError = function (err, res) {
    console.log(err);
    res.writeHead(404);
    res.end();
}

var server = http.createServer(function (req, res) {
    console.log('Responding to a request');

    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        console.log('CONTENT TYPE: ' + mime.lookup(filePath));
        res.setHeader('Content-Type', mime.lookup(filePath));
        if (err) {
            handleError(err, res);
        }
        else {
            res.end(data);
        }
    });
});
server.listen(3000);
