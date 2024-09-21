declare module 'swagger-autogen' {
  interface SwaggerAutogenResult<T = unknown> {
    success?: boolean;
    data?: T;
  }

  const swaggerAutogen: <T = unknown>(
    outputFile: string,
    endpointsFiles: string[],
    data?: T
  ) => Promise<SwaggerAutogenResult<T> | false>;

  export default swaggerAutogen;
}
