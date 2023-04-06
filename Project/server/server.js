//middleware
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
<<<<<<< HEAD
const port = process.env.PORT || 4000;

=======
const port = process.env.PORT || 8000;
>>>>>>> d931330072fc3c90ed7cee392687d6acf491b2e6
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");

//router
const itemRoute = require("./routes/item_routes.js");
app.use("/api/item_routes", itemRoute);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
