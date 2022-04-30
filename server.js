"use strict";

require("dotenv").config();

const express = require("express"),
  app = express(),
  cors = require("cors"),
  cookie = require("cookie-parser"),
  allRoutes = require("./routes"),
  errorHandler = require("./lib/errorHandler"),
  port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookie());

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// routes
app.use("/api", allRoutes);

// error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
