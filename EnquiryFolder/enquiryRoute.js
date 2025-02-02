const express = require('express')
const router = express.Router();
const { enquiry, editEnquiry, fetchEnquiry } = require('./enquiryController')
router.post('/enquiry-form', enquiry)
router.get('/list', fetchEnquiry)
router.put('/:id', editEnquiry);


module.exports = router