"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    csvConverter = require('csvtojson'),
    basicAuth = require('basicauth-middleware'),
    basicAuthMiddleware = basicAuth('admin', 'x23i7EzOkdW8?&9'),
    textParser = bodyParser.text(),
    CsvService = express.Router()

CsvService.post('/orders', basicAuthMiddleware, textParser, (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.send("Empty or invalid body data")
    } else {
        csvConverter({
                noheader: false,
                headers: ['tracking_number', 'amount', 'user_id', 'status']
            }).fromString(req.body)
            .on('done', (err) => {
                if (err) {
                    res.send("Parsing error")
                }
            })
            .on('end_parsed', (jsonArr) => {
                if (jsonArr) {
                    res.send("Success!")
                } else {
                    res.send("Invalid data!")
                }
            })
    }
})

/**
 * 
 * MODULE EXPORTS
 * 
 */

module.exports = CsvService