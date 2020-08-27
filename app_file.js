var express = require('express');
var bodyParser = require('body-parser');
//파일 시스템 제어하는 기본 모듈 fs 사용
var fs = require('fs');
var app = express();
//우리 app이 bodyParser를 이용하겠다 (패턴화해서 이해하세요)
app.use(bodyParser.urlencoded({extended:false})); 
//템플릿에 줄바꿈 해주도록
app.locals.pretty = true; 
app.set('views','./views_file');
app.set('view engine', 'pug');
app.get('/topic/new',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics:files})
    })
}) //라우팅
app.get(['/topic','/topic/:id'],function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id,'utf8',function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view',{topics:files, title:id, content:data})
            })
        } else {
            res.render('view',{topics:files, title:"Welcome", content: "Javascript"});
        }
    })
})

app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    //파일을 생성하는데 data 디렉토리 안에 파일의 이름은 입력 받은 title로, 파일의 내용은 입력받은 description으로
    //fs.writeFile은 세번째 인자로 에러를 처리하는 callback func를 받아요
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    })
})
app.listen(3000, function(){
    console.log('Connected, 3000 port!')
})