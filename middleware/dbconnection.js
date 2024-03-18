const mysql2=require('mysql2');
require('dotenv').config();

class connection{

        #connection;
    constructor() {
       this.#connection = mysql2.createPool({
            connectionLimit: process.env.DB_LIMIT,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWD,
            database: process.env.DB,
           dateStrings:['DATE','TIMESTAMP','DATETIME']
        });
        //this.add=this.add.bind(this);
    }

    #submit =(query, result)=> {
        this.#connection.getConnection((err, connection) => {
            if (err) {
                console.error(`error while getting connection to the database ::: ${err}`);
                return;
            } else {
                connection.execute(query, (err, rslt) => {
                    connection.release();
                    if (err) {
                        console.error(`error  while submitting the query ::: ${err}`);
                        //console.error(err)
                        return result({ err: 'error in your query' });
                    }
                    return result(rslt);
                });
            }
        });
    }

    add = (req, res) => {
        this.#submit(req.sql_query, (result) => {
            if (result.err) {
                return res.status(400).json(result);
            }
            if (result.affectedRows == 0)
                return res.status(400).json(`invalid request::: result` );
            else
                return res.status(200).json('successfully created');
        });
    }



    edit = (req,res)=>{

        this.#submit(req.sql_query,(result)=>{
            if(result.err){
                return res.status(400).json(result);
            }
            if(result.affectedRows == 0)
                return res.status(400).json('no such record');
            else
                return res.status(200).json('succefully edited');
        })
    }

    get = (req,res) =>{
        this.#submit(req.sql_query,(result)=>{
            if(result.err){
                return res.status(400).json(result);
            }
            if(result.length == 0)
                return res.status(404).json('no such record');
            else
                return res.status(200).json(result);
        })
    }

    delete = (req,res)=>{
        this.#submit(req.sql_query,(result)=>{
            if(result.err){
                return res.status(400).json(result);
            }
            if(result.affectedRows == 0)
                return res.status(404).json('no such record');
            else
                return res.status(204).json('deleted');
        })
    }

}
module.exports= new connection(); 
