// src/types/swagger-autogen.d.ts
declare module 'swagger-autogen' {
    interface SwaggerAutogenResult {
      success?: boolean;
      data?: any;
    }
  
    const swaggerAutogen: (
      outputFile: string,
      endpointsFiles: string[],
      data?: any
    ) => Promise<SwaggerAutogenResult | false>;
  
    export default swaggerAutogen;
  }
  