const http = require('http');
const fs = require('fs').promises;

http.createServer(async(req, res) => {
        try {
            const mainPage = await fs.readFile('./main_page.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset-utf-8' });
            res.end(mainPage);
        } catch (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    })
    .listen(8080, () => {
        console.log('8080번 포트에서 대기 중 입니다');
    });