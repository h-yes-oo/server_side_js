const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.locals.pretty = true;
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/form',function(req,res){
    res.render('form');
});
app.get('/form_receiver',function(req,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description)
})
app.post('/form_receiver',function(req,res){
    res.send(req.body.title+','+req.body.description);
})
app.get('/topic/:id',function(req, res){
    var topics = ['info','qna','story'];
    var output = `
    <a href="/topic/0"> club info </a><br>
    <a href="/topic/1"> club qna </a><br>
    <a href="/topic/2"> club story </a><br>
    ${topics[req.params.id]}
    `
    res.send(output);
})
app.get('/topic/:id/:mode',function(req,res){
    res.send(req.params.id+','+req.params.mode)
})

app.get('/template', function(req, res) {
    res.render('temp', {title: 'Hey', message: 'Hello there!',time: Date()}); //template이라는 경로로 들어온 사용자에게 temp라는 템플릿 파일을 웹페이지로 렌더링해서 전송한ㄷ나.
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/test.jpeg">')
})

app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i=0; i<5; i++){
        lis += '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
                ${lis}
            </ul>
            ${time};
        </body>
    </html>
    `;
    res.send(output);
})

app.get('/login',function(req,res){
    res.send('Login please');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})