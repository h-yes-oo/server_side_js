//web server를 만드는 코드 (출처 : nodejs.org/about/)
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});//서버를 만들어요

server.listen(port, hostname, () => {
  console.log(`Hihi Server running at http://${hostname}:${port}/`);
}); //3000번이라는 port와 이 컴퓨터의 ip를 준 Hostname 을 인자로 넘겨줌. 
// 즉, port 번호 3000을 listening하고 127.0.0.1로 접속한 유저에 대하여 hello world를 보여줌