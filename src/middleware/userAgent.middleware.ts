import UAParser from 'ua-parser-js';
import { RequestHandler } from 'express';

export const captureUserAgent: RequestHandler = (req, res, next) => {
  if (!req.session.deviceInfo) {
    const parser = new UAParser(req.headers['user-agent']);
    const result = parser.getResult();
    req.session.deviceInfo = {
      browser: result.browser.name,
      version: result.browser.version,
      os: result.os.name
    };
    req.session.lastActive = new Date();
  }
  next();
};

export const captureLastActive: RequestHandler = (req, res, next) => {
  if(req.isAuthenticated()) {
    req.session.lastActive = new Date();
  }
  next();
};
