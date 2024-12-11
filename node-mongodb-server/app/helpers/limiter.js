const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 15, // 5 requests per `window`
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "DDoS Protection: Too many request. Please try again later",
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 3, // 3 requests per `window`
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "DDoS Protection: Too many request. Please try again later",
});

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5, // 5 requests per `window`
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "DDoS Protection: Too many request. Please try again later",
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5, // 5 requests per `window`
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "DDoS Protection: Too many request. Please try again later",
});

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests per `window`
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "DDoS Protection: Too many request. Please try again later",
});

module.exports = {
  apiLimiter,
  loginLimiter,
  createAccountLimiter,
  resetPasswordLimiter,
  forgotPasswordLimiter,
};
