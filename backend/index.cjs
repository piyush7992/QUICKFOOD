const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

const mongoDb = require("./db");

mongoDb();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://quickfood-1-front.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", require("./Routes/createuser"));
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/order"));
app.use("/api", require("./Routes/myorders"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
