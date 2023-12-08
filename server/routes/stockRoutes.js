const express = require('express');
const { createAllStocks, singleStock, findStocks, everyDay, 
    checkStock, allTime, oneYear, fiveYears, monthly, 
    getStocks, fiveDays, sixMonths, saveStock, getSavedStocks, 
    delSavedStock, getFavStocks, checkSaveStock, buyShares, 
    getPortfolio, getTransact, sellStock } = require('../controllers/stockControllers');
const apiLimiter = require('../middlewares/rateLimiter');
const router = express.Router();

// router.get('/test', root);
router.post('/createAll', createAllStocks);
router.get('/inday/:code', apiLimiter, singleStock);
router.get('/search/:key', apiLimiter, findStocks);
router.get('/daily/:code', everyDay);
router.patch('/save/:code', saveStock);
router.post('/checkSave/:code', checkSaveStock);
router.post('/check/:code', checkStock);
router.patch('/buy/:code', buyShares);
router.patch('/sell/:code', sellStock);
router.patch('/delSaved/:code', delSavedStock);
router.get('/getSaved/:code', getSavedStocks);
router.get('/getFav', getFavStocks);
router.get('/fiveDays/:code', apiLimiter, fiveDays);
router.get('/sixMonths/:code', apiLimiter, sixMonths);
router.get('/allTime/:code', apiLimiter, allTime);
router.get('/year/:code', apiLimiter, oneYear);
router.get('/fiveYears/:code', apiLimiter, fiveYears);
router.get('/monthly/:code', apiLimiter, monthly);
router.get('/getStocks', getStocks);
router.get('/getPortfolio', getPortfolio);
router.get('/getTransact/:code', getTransact);
module.exports = router