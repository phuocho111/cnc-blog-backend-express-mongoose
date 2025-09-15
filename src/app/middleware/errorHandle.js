const { ERROR_STATUS } = require("../../constant/error");

const errorHandle = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  switch (statusCode) {
    case ERROR_STATUS.NOT_FOUND:
      res.status(statusCode).json({
        title: "Validateion Failed",
        message: err.message,
        stack: err.stack,
      });
      break;
    case ERROR_STATUS.INTERNAL_SERVER:
      res.status(statusCode).json({
        title: "Not Found",
        message: err.message,
        stack: err.stack,
      });
      break;
    case ERROR_STATUS.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        stack: err.stack,
      });
      break;
    case ERROR_STATUS.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        stack: err.stack,
      });
      break;
    default:
      break;
  }
};
module.exports = errorHandle;
