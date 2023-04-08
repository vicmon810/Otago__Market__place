const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");

//router
const itemRoute = require("./routes/item_routes.js");
app.use("/api/item_routes", itemRoute);

// mongoose.connect(port).then(() => {
//   //LISTEN for requests
//   app
//     .listen(port, () => {
//       console.log("Server is running on port : ${port}");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
