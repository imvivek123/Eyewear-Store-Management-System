// Copilot: implement role check middleware, reject with 403 if role !== required role
export function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (req.user.role !== requiredRole && requiredRole !== 'any') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}
