const express = require("express");
const db = require('../middleware/dbconnection');
const event= require('../middleware/events');
const validate= require('../middleware/validate_req');
const e_category= require('../middleware/category');
const prayer= require('../middleware/prayer_request');
const router = express.Router();
router.get('/',(req,res)=>{
    res.json("i am now  ready do as u please");
});
router.post('/event',validate.event_req,event.create,db.add);
router.get('/events',event.events,db.get);
router.route('/event/:id').patch(validate.event_req,event.edit,db.edit)
.delete(event.delete,db.delete)
.get(event.event,db.get);

router.post('/prayer_request',validate.prayer_surp_req,prayer.create,db.add);
router.get('/prayer_requests',prayer.prayer_requests,db.get);
router.route('/prayer_request/:id').patch(validate.prayer_surp_req,prayer.edit,db.edit)
.delete(prayer.delete,db.delete)
.get(prayer.prayer_request,db.get);

router.post('/e_category',validate.ev_category_req,e_category.create,db.add);
router.get('/e_categorys',e_category.categorys,db.get);
router.route('/e_category/:id').patch(validate.ev_category_req,e_category.edit,db.edit)
.delete(e_category.delete,db.delete)
.get(e_category.category,db.get);
module.exports=router;
