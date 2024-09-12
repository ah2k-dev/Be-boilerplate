import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "BE Boilerplate",
    description: "BE Boilerplate api endpoints",
    version: "1.0.0",
  },
  host: "localhost:8003",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
};

const outputFile = "./swagger_output.json"; // Generated Swagger file
const endpointsFiles = ["./src/router/index.js"]; // Path to the API routes files

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger file generated");
});
