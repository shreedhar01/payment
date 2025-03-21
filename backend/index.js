import express from "express"
import route from "./routes/index.js"
import cors from "cors"

const app = express()


app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE','OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
// Add explicit handler for OPTIONS requests
app.options('*', cors());

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