
import express, { Request, Response } from "express";
import dotenv from "dotenv";
const mysql = require('mysql2/promise');
dotenv.config();
const app = express();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};
const pool = mysql.createPool(dbConfig);
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL データベースに正常に接続しました');
    connection.release();
  } catch (err) {
    console.error('MySQL 接続エラー:', err);
  }
}

  

const PORT = process.env.EXPRESS_PORT;

app.get("/", async (request: Request, response: Response) => { 
    const query = "select * from test"
    const [data] = await pool.query(query);
  response.status(200).json({ message: "hello Express" , dbMessage:data[0].text});

}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
  testConnection()
}).on("error", (error) => {
  // エラーの処理
  throw new Error(error.message);
});
