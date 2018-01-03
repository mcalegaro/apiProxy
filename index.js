
	var http = require('http');
	var express = require('express');
    const app = express();
    var request = require('request');
    var querystring = require('querystring');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    // app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    //     extended: true
    // }));
    app.get('/api', (req, res) => {
        var url = req.url.replace('/api?url=', '');
        var mth = req.method;
        var hdr = req.headers;
        delete hdr.host;
        delete hdr.origin;
        console.info(url);
        var opts = {
            method: mth,
            uri: url,
            headers: hdr,
            body: JSON.stringify(req.data)
        };
        try {
            req.pipe(request(opts)).pipe(res);
        } catch (error) {
            console.error(error)
        }
    });
    app.post('/api', (req, res) => {
        var uri = req.url.replace('/api?url=', '');
        console.info(uri);
        var body = req.body;
        try {
            request.post({
                url: uri,
                json: body
            }).pipe(res);
        } catch (error) {
            console.error(error)
        }
    });
    
	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});