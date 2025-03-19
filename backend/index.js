import express from "express"
import route from "./routes/index.js"
import cors from "cors"

const app = express()


app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use("/api/v1", route)

// For local development only
if (process.env.NODE_ENV !== 'production') {
    app.listen(8000, () => {
      console.log('Server running on port 8000');
    });
  }
  
  // For Vercel serverless deployment
  export default app