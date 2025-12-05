const rateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const userRequests = requests.get(ip);
    const validRequests = userRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= max) {
      return res.status(429).json({ 
        message: 'Too many requests', 
        retryAfter: Math.ceil(windowMs / 1000) 
      });
    }
    
    validRequests.push(now);
    requests.set(ip, validRequests);
    
    next();
  };
};

export default rateLimiter;