const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoDb = require('./db');
const http = require("http");
// const socket = require("./socket/socket");

// const server = http.createServer(app);
// const io = socket.init(server); 

// server.listen(5000, () => {
//   console.log("Server Running with Socket 🔥");
// });
// io.on("connection",(socket)=>{

//   socket.on("riderLocation",(data)=>{

//     io.emit("riderLocationUpdate",data);

//   });

// });


mongoDb();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://quickfood-1-front.onrender.com/");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(express.json());

app.use('/api', require('./Routes/createuser'));
app.use('/api', require('./Routes/displayData'));
app.use('/api', require('./Routes/order'));
app.use('/api', require('./Routes/myorders'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
