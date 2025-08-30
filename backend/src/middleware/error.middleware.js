const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, _next) => {
  console.error('❌ Error:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Server Error',
    // stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = { notFound, errorHandler };
