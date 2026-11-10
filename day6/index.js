import express from "express"
import booksRouter from "./routes/booksRoutes.js"
import { rateLimit } from 'express-rate-limit'

//yesle request lai handle garxa
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.

const app=express()

app.get("/",(req,res)=>{
    res.status(200).send("Backend is working")

})
//middleware- frontend bata aayeko request lai response dinu bhanda agadi kei kaam garne
app.use((req,res,next)=>{
    console.log("Middleware")
    next()
})
app.use(limiter)
app.use(express.static("public"))//to access static file like route in public--http://localhost:8000/images/pathik.png
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books",booksRouter)

app.listen(8000,()=>{
    console.log(" Server is started from day 6")
})