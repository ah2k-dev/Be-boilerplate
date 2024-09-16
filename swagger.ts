import swaggerAutogen from 'swagger-autogen';
import { SwaggerDoc } from './src/types/generalTypes'; // Ensure this path is correct

const doc: SwaggerDoc = {
  info: {
    title: 'UrbanSoap BE',
    description: 'UrbanSoap API endpoints',
    version: '1.0.0',
  },
  host: 'urbansoap-danny-be-production.up.railway.app',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [],
};

const outputFile: string = './swagger_output.json'; // Generated Swagger file
const endpointsFiles: string[] = ['./src/router/index.ts']; // Path to the API routes files

const generateSwagger = async (): Promise<void> => {
  try {
    const result = await swaggerAutogen(outputFile, endpointsFiles, doc);
    console.log('Swagger file generated');
  } catch (error) {
    console.error('Error generating Swagger file:', error);
  }
};

generateSwagger();
