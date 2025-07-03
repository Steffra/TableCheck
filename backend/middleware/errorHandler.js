function errorHandler(err, req, res, next) {
  // Log error stack for debugging
  console.error(err.stack || err);

  if (res.headersSent) {
    return next(err);
  }

  // Respond with JSON for API requests, otherwise plain text
  if (req.xhr || req.headers.accept?.includes("application/json")) {
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  } else {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
}

module.exports = errorHandler;
