// This file is used in dev mode only

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/*',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            secure: false
        })
    );
};