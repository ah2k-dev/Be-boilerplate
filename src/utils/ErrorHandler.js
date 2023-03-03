class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

//  return next(new ErrorHandler("not found", 404)); use it like this for error responses

module.exports = ErrorHandler