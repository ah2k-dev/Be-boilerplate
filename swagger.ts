import swaggerAutogen from 'swagger-autogen';
import { SwaggerDoc } from './src/types/generalTypes'; // Ensure this path is correct

const doc: SwaggerDoc = {
  info: {
    title: 'Node + Express + MongoDB Ts Boilerplate',
    description:
      'API Documentation for Node + Express + MongoDB Ts Boilerplate',
    version: '1.0.0'
  },
  host: 'localhost:8006',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: []
};

const outputFile: string = './swagger_output.json'; // Generated Swagger file
const endpointsFiles: string[] = ['./src/router/index.ts']; // Path to the API routes files

const generateSwagger = async (): Promise<void> => {
  try {
    const result = await swaggerAutogen(outputFile, endpointsFiles, doc);
    console.log('Swagger file generated', result);
  } catch (error) {
    console.error('Error generating Swagger file:', error);
  }
};

generateSwagger();
