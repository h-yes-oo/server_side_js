var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1003',
    database : 'o2'
});
conn.connect();

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;

app.set('views','./views_mysql');
app.set('view engine', 'pug');

app.get('/topic/add',function(req,res){
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql,function(err, topics, fields){
        res.render('add',{topics:topics});
    });
})

app.post('/topic/add',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
    conn.query(sql,[title,description,author],function(err, results, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+results.insertId);
    })
})

app.get('/topic/:id/edit',function(req,res){
    var sql = 'SELECT id,title from topic';
    conn.query(sql,function(err, topics,fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?'
            conn.query(sql, [id], function(err, results, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('edit',{topics:topics, topic:results[0],})
                }
            })
        } else {
            console.log('There is no such id');
            res.status(500).send('Internal Server Error');
        }

    })
})

app.post('/topic/:id/edit',function(req,res){
    var id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
    conn.query(sql,[title,description,author,id],function(err, results, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/'+id);
        }
    });
});

app.get('/topic/:id/delete',function(req,res){
    var id = req.params.id;
    var sql = 'SELECT id,title from topic';
    conn.query(sql,function(err,topics,fields){
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql,[id],function(err,results){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else{
                if(results.length == 0){
                    console.log('There\'s no such id');
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('delete',{topics:topics,topic:results[0]});
                }
            }
        })
    })
})

app.post('/topic/:id/delete',function(req,res){
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?';
    conn.query(sql,[id],function(err,results){
        res.redirect('/topic');
    })
})

app.get(['/topic','/topic/:id'],function(req,res){
    //데이터베이스를 이용하여 구현
    var sql = 'SELECT id,title from topic';
    conn.query(sql,function(err, topics, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, results, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('view',{topics:topics, topic:results[0]})
                }
            })
        } else {
            res.render('view', {topics:topics});
        }
    })
})

app.listen(3000, function(){
    console.log('Connected, 3000 port!')
})