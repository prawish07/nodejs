import express from "express";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.use((req,res,next)=>{
   validateToken(req,res,next)
})
router.get("/",(req,res)=>{
    res.status(200).send(true)
});
router.post("/add",(req,res)=>{
    // console.log(req.headers)
    console.log(req.body,req.query)
    
    res.status(200).send("Book is added")
});
router.get("/json",(req,res)=>{
    res.status(200).json({json:"true"})
});
router.delete("/delete/:id",(req,res)=>{
    console.log(req.params)
    res.status(200).json({delete:true})
});
// router.get("/insert",(req,res)=>{

//     res.status(200).json({insert:true})
// });
router.get("/edit",(req,res)=>{
    res.status(200).json({insert:true})
});
router.get("/insert",(req,res)=>{
    //http://localhost:8000/books/insert?id=2&name=prabesh
    const {id,name}=req.query
    console.log(id,name)
    console.log(req.query)
    res.status(200).json({insert:true})
    
});
router.get("/modify/:id/setting/:name",(req,res)=>{
    //http://localhost:8000/books/modify/22/setting/prabesh
    
    console.log(req.params)
    res.status(200).json({insert:true})
    
});



export default router