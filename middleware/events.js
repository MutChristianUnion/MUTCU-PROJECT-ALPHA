const sql = require('sql-template-strings');
class event{
     create(req,res,next){
         const query= sql`insert into events (event_id,title,start_date,end_date,venue,description,category_id,notification_time)
         values(uuid(),${req.body.TITLE||null},${req.body.START_DATE||null},${req.body.END_DATE||null},${req.body.VENUE||null},${req.body.DESC||null},${req.body.category_id},
             ${req.body.NOTIFY_TIME||null})`;
         req.sql_query =query;
         next();
    }
     edit(req,res,next){
         if(req.params.id){
             const query= sql`update events set title=${req.body.TITLE||null},start_date=${req.body.START_DATE||null},
                 end_date=${req.body.END_DATE||null},venue=${req.body.VENUE||null},description=${req.body.DESC||null},
                 category_id=${req.body.category_id},notification_time=${req.body.NOTIFY_TIME||null} where event_id = ${req.params.id} `;
             req.sql_query =query;
             next();
         }else
         res.status(404).json("invalid request");
    }

     events(req,res,next){
         const  query = sql`select E.event_id,E.title,E.start_date,E.end_date,E.venue,E.description, C.title as category 
         from events as E
         join events_category as C on C.category_id = E.category_id `;
         req.sql_query =query;
         next();
    }
    event(req,res,next){
        if(req.params.id){
         const  query = sql`select E.event_id,E.title,E.start_date,E.end_date,E.venue,E.description, C.title  as category
         from events as E
         join events_category as C on C.category_id = E.category_id  where event_id = ${req.params.id}`;
            req.sql_query =query;
            next();
        }else
            res.status(404).json("invalid request");
    }

     delete(req,res,next){
         if(req.params.id){
             const query = sql`delete from events where event_id = ${req.params.id}`;
             req.sql_query =query;
             next();
         }else
            res.status(404).json("invalid request");
    }
}
module.exports = new event();
