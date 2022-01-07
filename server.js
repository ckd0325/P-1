const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/front_end"));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("success");
    res.sendFile(path.resolve("front_end", "page.html"));
});

app.post('/write-post', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(process.env.PORT || 8080, () => console.log("Server runing ..."));