const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://staging-edc-api1.azurewebsites.net/api/v1',
      changeOrigin: true,
    })
  );
};
