const sql = require('sql-template-strings');
class prayer_request{
     create(req,res,next){
         const query= sql`insert into prayers(prayer_id,sender_names,sender_address,prayer_request)
         values(uuid(),${req.body.SENDER_NAMES},${req.body.SENDER_ADDRESS},${req.body.REQUEST})`;
         req.sql_query =query;
         next();
    }
     edit(req,res,next){
         if(req.params.id){
             const query= sql`update prayers set sender_names=${req.body.SENDER_NAMES},sender_address=${req.body.SENDER_ADDRESS},
                 prayer_request=${req.body.REQUEST} where prayer_id = ${req.params.id} `;
             req.sql_query =query;
             next();
         }else
         res.status(404).json("invalid request");
    }

     prayer_requests(req,res,next){
         const  query = sql`select * from  prayers `;
         req.sql_query =query;
         next();
    }
    prayer_request(req,res,next){
        if(req.params.id){
         const  query = sql`select * from prayers where prayer_id = ${req.params.id}`;
            req.sql_query =query;
            next();
        }else
            res.status(404).json("invalid request");
    }

     delete(req,res,next){
         if(req.params.id){
             const query = sql`delete from prayers where prayer_id = ${req.params.id}`;
             req.sql_query =query;
             next();
         }else
            res.status(404).json("invalid request");
    }
}
module.exports = new prayer_request();
