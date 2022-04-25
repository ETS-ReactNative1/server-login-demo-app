"use strict";

const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser"); // cookies required for login authentication
require("dotenv").config();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
//----------------------------------------------------------------------------------
const {
  authenticateLoginToken,
} = require("./controllers/authentication/1.authenticateLoginToken");
const {
  getAllDataLists,
} = require("./db/dbMongo/queries/list/getAllDataLists");

const getItemId = require("./db/dbMongo/queries/list/getItemId");
const getDataItemTypeahead = require("./db/dbMongo/queries/list/getDataItemTypeahead");
const customerRoutes = require("./routes/customer");
const mealRoutes = require("./routes/meal");
const productRoutes = require("./routes/product");

const port = process.env.PORT || 5000;
const facebook = require("./routes/facebook");

require("./db/dbMongo/config/db_connection");
require("./db/dbPostgress/config/db_connection");

if (cluster.isMaster) {
  for (var i = 0; i < totalCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} else {
  const app = express();
  //----------------------------------------------------------------------------------
  app.set("view engine", "ejs");
  app.use(express.json({ limit: "50mb" }));

  app.use(cookie());

  app.use(cors());

  app.use("/facebook", facebook);
  app.use("/api/customer", customerRoutes);
  app.use("/api/meals", mealRoutes);
  app.use("/api/products", productRoutes);

  app.get("/api/get-data-item/:idItem", getItemId);

  app.get("/api/get-data-typeahead/:option", getDataItemTypeahead);

  // app.get("/api/authenticate-app-page", verifyAuthentication, isAuthenticated);
  app.get("/api/get-all-data-lists", getAllDataLists);

  app.get("/renderEJS", (req, res) => {
    console.log("To render ");
    res.render("index");
  });

  app.get("/privacy-policy", (req, res) => {
    console.log("To render ");
    res.render("pages/privacy-policy");
  });

  app.get("/terms-of-service", (req, res) => {
    console.log("To render ");
    res.render("pages/terms-of-service");
  });

  app.post("/api/login", authenticateLoginToken);

  app.use((error) => {
    console.log("This is the rejected field ->", error.field);
    console.log(error);
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
}
