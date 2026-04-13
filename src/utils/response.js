function sendResponse(res, statusCode, message, data = null) {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
}

module.exports = { sendResponse };
