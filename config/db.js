let mysql = require("mysql");
let pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"blog"
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;