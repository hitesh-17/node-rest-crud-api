import express from "express";

const app = express();

app.get("/health",(req,res)=>{
    res.json({statusCode: 200,status : "ok"})
})

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "server is running......."
    })
})

export default app;