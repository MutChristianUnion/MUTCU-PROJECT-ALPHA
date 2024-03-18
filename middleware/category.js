const sql = require('sql-template-strings');
class categorys{
     create(req,res,next){
         if(req.body.TITLE != null){
             const query= sql`insert into events_category(category_id,title) values(uuid(),${req.body.TITLE})`;
            req.sql_query =query;
            next();
         }else
             res.status(404).json("invalid request");
    }
     edit(req,res,next){
         if(req.params.id){
             const query= sql`update events_category set title =${req.body.TITLE} where category_id = ${req.params.id}`;
             req.sql_query=query;
             next();
         }else
         res.status(404).json("invalid request");
    }

     categorys(req,res,next){
         const  query = sql`select * from events_category`;
         req.sql_query =query;
         next();
    }
    category(req,res,next){
        if(req.params.id){
            const query = sql`select * from events_category where category_id = ${req.params.id}`;
            req.sql_query =query;
            next();
        }else
            res.status(404).json("invalid request");
    }

     delete(req,res,next){
         if(req.params.id){
             const query = sql`delete from events_category where category_id = ${req.params.id}`;
             req.sql_query =query;
             next();
         }else
            res.status(404).json("invalid request");
    }
}
module.exports= new categorys();
