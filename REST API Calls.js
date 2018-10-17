/**
* Name: Abdullah Mansour Alharbi
* Assignment: REST API Calls
* CIS 445
**/

const exp = require('express');
const tempRouter = exp.Router();

tempRouter.get('https://server/review/:reviewid', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to be handled'
    });
});

tempRouter.get('https://server/review/:n/:stars', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to be handled'
    });
});

tempRouter.get('https://server/review/:n/:from_date/:to_date', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to be handled'
    });
});

tempRouter.post('https://server/review/:reviewid', (req, res, next) => {
    res.status(201).json({
        message: 'POST requests to be handled'
    });
});


tempRouter.put('https://server/review/:reviewid', (req, res, next) => {
    res.status(200).json({
        message: 'The review has been updated'
    });
});

tempRouter.delete('https://server/review/:reviewid', (req, res, next) => {
    res.status(200).json({
        message: 'The review has been deleted'
    });
});

module.exports = tempRouter;