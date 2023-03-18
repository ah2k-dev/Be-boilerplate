const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const app = express();
const { auth } = require("./router");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json"); // Generated Swagger file
const swaggerAutogen = require("swagger-autogen")();

// start
const doc = {
  info: {
    title: "BE Boilerplate",
    description: "BE Boilerplate for user authentication, email verification, socket.io, swagger, logger, etc.",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  // tags: [
  //   {
  //     name: "auth",
  //     description: "APIs for managing authentication",
  //   },
  //   {
  //     name: "user",
  //     description: "APIs for managing users",
  //   },
  // ],
};

const outputFile = "./src/swagger_output.json"; // Generated Swagger file
const endpointsFiles = ['./src/router/auth.js']; // Path to the API routes files

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger file generated");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// end

// Middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);

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
