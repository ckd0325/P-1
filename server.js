const express = require("express");
const path = require("path");
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '525252',
    database: 'ajou_bulletin',
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected');
});

app.use(express.static(__dirname + "/front_end"));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("success");
    res.sendFile(path.resolve("front_end", "index.html"));
});

app.get('/post-number/:category', (req, res) => { // 현재 게시판 게시글 개수 전송
    const category = req.params.category;
    let requiredDB;

    if (category === 'free-bulletin') {
        requiredDB = 'free_bulletin';
    } else if (category === 'secret-bulletin') {
        requiredDB = 'secret_bulletin';
    } else if (category === 'information-bulletin') {
        requiredDB = 'information_bulletin';
    } else if (category === 'promotion-bulletin') {
        requiredDB = 'promotion_bulletin';
    } else {
        requiredDB = 'sw_bulletin';
    }

    con.query(`SELECT count(*) as count FROM ${requiredDB};`,
        (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
})

app.get('/bulletin-list/:currentBulletin/:numOfPage/:numOfPost/:page', (req, res) => { //페이지에 해당하는 게시글 정보 전송
    const numOfPage = req.params.numOfPage;
    const numOfPost = req.params.numOfPost;
    const pageNum = req.params.page;
    let pageSize = 6;
    const currentBulletin = req.params.currentBulletin;
    let currentDB;
    console.log(`${numOfPage}  ${numOfPost}  ${pageNum}`);

    let offset = (numOfPage - pageNum - 1) * pageSize + (numOfPost % pageSize);

    if (numOfPage === pageNum) {
        offset = 0;
        pageSize = numOfPost % pageSize;
    }

    currentDB = decideDB(currentBulletin);

    console.log(`${offset}   ${currentBulletin}`);
    con.query(`SELECT * FROM ${currentDB} LIMIT ${offset}, ${pageSize};`,
        (err, result) => {
            if (err) throw err;

            res.send(result);
        })
});

app.get('/post/:bulletin/:num', (req, res) => { // 게시글 제목 클릭 시 해당 게시글 정보 전송
    const bulletinName = req.params.bulletin;
    const postNum = req.params.num;
    const currentDB = decideDB(bulletinName);

    con.query(`SELECT * FROM ${currentDB} WHERE post_number=${postNum};`,
        (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
})

app.post('/write-post', (req, res) => { //글쓰기 했을 때 DB에 기록
    const date = req.body.date;
    const select = req.body.select;
    const title = req.body.title;
    const content = req.body.content;
    let category;

    console.log(req.body);
    if (select === '자유 게시판') {
        category = 'free_bulletin';
    } else if (select === '비밀 게시판') {
        category = 'secret_bulletin';
    } else if (select === '정보 게시판') {
        category = 'information_bulletin';
    } else if (select === '홍보 게시판') {
        category = 'promotion_bulletin';
    } else {
        category = 'sw_bulletin';
    }
    con.query(`INSERT INTO ${category} (date, title, content) VALUES(?, ?, ?);`, [date, title, content],
        (err, result) => {
            if (err) throw err;
            console.log("Post added.");
        })
});

app.post('/sign-up-user', (req, res) => { //회원가입 시 정보 DB에 기록
    console.log(req.body);
    const userInfo = req.body;
    con.query(`INSERT INTO user (id, password) VALUES(?, ?);`, [userInfo.id, ""],
        (err, result) => {
            if (err) throw err;
            console.log("User added.");
        });
});

app.post('/login', (req, res) => { //로그인 처리
    const userId = req.body.id;
    con.query(`SELECT id FROM user WHERE id=?`, [userId],
        (err, result) => {
            if (err) throw err;
            console.log(req.body.id);
            console.log(result[0]);
            console.log("login success");
            if (result[0] === undefined) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
});

app.listen(process.env.PORT || 8080, () => console.log("Server runing ..."));

function decideDB(bulletinName) {
    if (bulletinName === 'free-bulletin') {
        return 'free_bulletin';
    } else if (bulletinName === 'secret-bulletin') {
        return 'secret_bulletin';
    } else if (bulletinName === 'information-bulletin') {
        return 'information_bulletin';
    } else if (bulletinName === 'promotion-bulletin') {
        return 'promotion_bulletin';
    } else {
        return 'sw_bulletin';
    }
}