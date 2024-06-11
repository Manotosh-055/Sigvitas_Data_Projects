const express = require('express');
const { addData, getData, searchData} = require('../controller/dataController');
const router = express.Router();

router.post('/add-data', addData);

router.get('/get-data', getData);

router.get('/search-data', searchData);



module.exports = router;