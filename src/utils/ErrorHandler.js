const ErrorHandler = (message, statusCode, res) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
}

module.exports = ErrorHandler