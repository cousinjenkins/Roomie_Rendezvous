import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyToUniversities: RequestHandler = createProxyMiddleware({
  target: 'http://universities.hipolabs.com',
  changeOrigin: true,
  pathRewrite: {
    '^/search': '/search'
  },
});
