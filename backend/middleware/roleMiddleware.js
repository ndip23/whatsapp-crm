
export const superAdminOnly = async (req, res, next) => {
    if(req.user.role !== "SUPER_ADMIN") {
        return res.status(403).json({message: "Access denied, super admins only"});
    }
    next();
}

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

export const agentOnly = (req, res, next) => {
  if (req.user.role !== "AGENT") {
    return res.status(403).json({ message: "Agents only" });
  }
  next();
};