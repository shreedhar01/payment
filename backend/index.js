import express from "express"
import route from "./routes/index.js"
import cors from "cors"

const app = express()


app.use(cors())
app.use(express.json())

app.use("/api/v1", route)

app.listen(8000)


