const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const app = express();
const { auth } = require("./router");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const apiDoc = require("./apiDoc");

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boilerplate API",
      version: "1.1",
    },
  },
  // Path to the API routes files
  apis: ["./src/apiDoc.js"],
};

// Generate Swagger specification
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("BE-boilerplate v1.1");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

module.exports = app;
