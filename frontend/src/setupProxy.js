const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://sigvitas-data-projects.vercel.app',
      changeOrigin: true,
    })
  );
};    