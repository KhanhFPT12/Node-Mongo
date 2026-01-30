module.exports = function validateLength(fieldName, min = 1, max = 9999) {
  return (req, res, next) => {
    const value = req.body?.[fieldName];
    if (value == null) return next();

    if (typeof value !== "string") {
      return res.status(400).json({ message: `${fieldName} must be a string` });
    }
    if (value.length < min || value.length > max) {
      return res.status(400).json({ message: `${fieldName} length must be ${min}-${max}` });
    }
    next();
  };
};
