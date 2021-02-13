const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());
//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

//middleware

app.use(`${api}+/products`, productsRoutes);
app.use(`${api}+/categories`, categoriesRoutes);
app.use(`${api}+/orders`, ordersRoutes);
app.use(`${api}+/users`, usersRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })

  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("server is running https://localhost:3000");
});
