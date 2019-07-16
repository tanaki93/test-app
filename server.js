'use strict';

require('isomorphic-fetch');

const express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');

const port = 82;
const app = express();

const address = 'http://depok.pixelkalpak.com:9000/';

app.use('/api', proxy(address, {
    proxyReqPathResolver: (req, res) => '/api' + url.parse(req.url).path
}));

app.use('/media', proxy(address, {
    proxyReqPathResolver: (req, res) => '/media' + url.parse(req.url).path
}));

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});