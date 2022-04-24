"use strict";
// allow to store local env variables in nodejs process event environment(env) object
// var sslRedirect = require('heroku-ssl-redirect');
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser"); // cookies required for login authentication
const mongoose = require("mongoose");
require("dotenv").config();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

const Crypto = require("crypto");
//----------------------------------------------------------------------------------
const {
  authenticateLoginToken,
} = require("./controllers/authentication/1.authenticateLoginToken");
const { readFile } = require("./db/dbMongo/config/readFile");
const { readFiles } = require("./db/dbMongo/config/readFiles");
const { readImage } = require("./db/dbMongo/config/readImage");
const { readImages } = require("./db/dbMongo/config/readImages");
const {
  getAllDataLists,
} = require("./db/dbMongo/queries/list/getAllDataLists");
const {
  getAllProducts,
} = require("./db/dbMongo/queries/productsAPI/getAllProducts");
// const appendItem = require('./db/dbMongo/queries/list/appendItem')
// const createList = require('./db/dbMongo/queries/list/createList')
// const getCustomersLists = require('./db/dbMongo/queries/list/getCustomersLists') // commented out until needed
const getItemId = require("./db/dbMongo/queries/list/getItemId");
const getDataItemTypeahead = require("./db/dbMongo/queries/list/getDataItemTypeahead");
const {
  getAllCategories,
} = require("./db/dbMongo/queries/mealsAPI/getAllCategories");
const customerRoutes = require("./routes/customer");
const mealRoutes = require("./routes/meal");

const port = process.env.PORT || 5000;
const facebook = require("./routes/facebook");
function randomString(size = 6) {
  return Crypto.randomBytes(size).toString("base64").slice(0, size);
}

const pw = process.env.MongoPassword;
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
  // app.use(express.urlencoded({extend: true, limit:'25mb'}));
  // vv replaced with above for testing ^^
  // app.use(express.urlencoded({extended: true, limit: '25mb'}));
  // app.use(bodyParser.json({limit: '50mb'}));
  app.use(cookie());
  // app.use(sslRedirect());
  app.use(cors());

  app.use("/facebook", facebook);
  app.use("/api/customer", customerRoutes);
  app.use("/api/meals", mealRoutes);

  // Multer for Meal Image, written after app.use
  var multer = require("multer");

  // Multer for Instruction Chunk Content Images and Videos, written after app.use
  var multer2 = require("multer");

  var storage = multer.diskStorage({
    destination: "./multerFilesToDBs",
    filename: function (req, file, cb) {
      console.log("In filename instantiator where simple file details are:");
      console.log(file);
      // console.log("req is");
      // console.log(req);
      const str1 = randomString()
        .replace("+", "")
        .replace("-", "")
        .replace("/", "")
        .replace("*", "")
        .replace("/", "")
        .replace("?", "");
      cb(null, str1 + file.originalname);
    },
  });

  var storage2 = multer2.diskStorage({
    destination: "./multerFilesToDBs",
    filename: function (req, file, cb) {
      const str1 = randomString()
        .replace("+", "")
        .replace("-", "")
        .replace("/", "")
        .replace("*", "")
        .replace("/", "")
        .replace("?", "");
      cb(null, str1 + file.originalname);
    },
  });

  var upload = multer({ storage: storage });
  var upload2 = multer2({ storage: storage2 });

  app.get("/get_store_products", async (req, res) => {
    mongoose.connect(process.env.MONGO_URI_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Calling servers get_store_products to Mongo");
    //Check if we connected to the database or not
    let db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection error:"));
    await db.once("open", function () {
      console.log("We are supposedly connected to the Mongo database");
      // var dbo = db.model("Product_Supply");
      db.collection("Store_Products")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          console.log("store products results are in");
          console.log(result);
          res.send(result);
          //leaving db open to allow for call at any point (eg when changing the page)
          // db.close();
        });
      // perform actions on the collection object
    });
    // const vari = await
    // console.log(vari);
  });

  app.get("/getAllMongoFileImages", readImages);
  app.get("/getAllMongoFilesData", readFiles);

  app.get("/getOneMongoFileData/:filename", readFile);
  app.get("/getOneMongoFileImage/:filename", readImage);

  app.get("/api/get-all-products", getAllProducts);
  app.get("/api/get-all-categories", getAllCategories);

  // app.post('/api/create-list/:idItem/:customerId', createList) // no to create list on grocery page

  // app.get('/api/get-customers-lists', getCustomersLists)
  app.get("/api/get-data-item/:idItem", getItemId);

  app.get("/api/get-data-typeahead/:option", getDataItemTypeahead);

  // app.get("/api/authenticate-app-page", verifyAuthentication, isAuthenticated);
  app.get("/api/get-all-data-lists", getAllDataLists);

  app.get("/test", (req, res) => {
    console.log("To test page");
    res.send(JSON.stringify(req.session));
  });

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

  // test multer logging
  app.use((error) => {
    console.log("This is the rejected field ->", error.field);
    console.log(error);
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
}
