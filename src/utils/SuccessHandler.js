const SuccessHandler = (data, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
    data: data,
  });
};
  // return next(new SuccessHandler("success", 200)); use it like this for success responses
  
  module.exports = SuccessHandler;