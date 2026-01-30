module.exports = function validateDate(fieldName = "date") {
  return (req, res, next) => {
    const value = req.body?.[fieldName];
    if (!value) return next();

    const ok = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (!ok) return res.status(400).json({ message: `${fieldName} must be YYYY-MM-DD` });

    next();
  };
};
