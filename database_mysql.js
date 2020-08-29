var mysql = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1003',
    database : 'o2'
});
conn.connect();

var sql = 'DELETE FROM topic WHERE id=?';
params = [1];
conn.query(sql, params, function(err, results, fields){
    if(err){
        console.log(err);
    } else {
        console.log(results);
    }
})
conn.end();