class SuccessHandler {
    constructor(data, statusCode) {
      this.data = data;
      this.statusCode = statusCode;
    }
  }
  // return next(new SuccessHandler("success", 200)); use it like this for success responses
  
  module.exports = SuccessHandler;