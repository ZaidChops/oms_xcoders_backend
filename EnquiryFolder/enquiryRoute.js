const express=require('express')
// const {enquiry} = require('../controllers/enquiryController')
const router=express.Router();

const {enquiry,Editenquiry,fetchEnquiry}=require('./enquiryController')

router.post('/enquiry-form',enquiry)
router.get('/list',fetchEnquiry)
router.put('/:id', Editenquiry);
// router.put('/:id',Editenquiry)

module.exports=router