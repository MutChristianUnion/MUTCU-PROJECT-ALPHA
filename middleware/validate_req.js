const schema = require('../validation_schema/v_schemas');
const event_req= async (req,res,next)=>{
    try{
        const result = await schema.events_schema.validateAsync(req.body,{abortEarly:false});
        req.body = result
        next();
    }catch(err){
        res.json(err);
    }
}
const ev_category_req= async (req,res,next)=>{
    try{
        const result = await schema.event_category.validateAsync(req.body,{abortEarly:false});
        req.body = result
        next();
    }catch(err){
        res.json(err);
    }
}
const prayer_surp_req= async (req,res,next)=>{
    try{
        const result = await schema.prayer_support.validateAsync(req.body,{abortEarly:false});
        req.body = result
        next();
    }catch(err){
        res.json(err);
    }
}
module.exports={prayer_surp_req,event_req,ev_category_req}
