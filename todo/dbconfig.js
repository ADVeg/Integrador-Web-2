import mysql from "promise-mysql";

const config = {
  database: "trivia_mundo",
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 10,
};

const conn = await mysql.createPool(config);

export default conn;