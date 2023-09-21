import express from "express";
import indexrouter from "./routers/index.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexrouter);

app.use(express.static('public'));
app.listen(3000, () => {
    console.log("Listening on port 3000");
});