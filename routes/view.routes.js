const express = require('express');
const path = require('path');
const router = express.Router();

const VIEW_BASE_DIR = path.resolve(__dirname+'/../public/views')+'/';

router.get('/', (req,res) => {
    res.sendFile(VIEW_BASE_DIR+'index.html');
});

router.get('/create', (req,res) => {
    res.sendFile(VIEW_BASE_DIR+'inputcontact.html');
});

router.get('/edit/:contactid', (req,res) => {
    res.sendFile(VIEW_BASE_DIR+'inputcontact.html');
});


module.exports = router;