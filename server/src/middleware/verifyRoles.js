const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({ message: 'No roles provided' })
    }
    const rolesArray = [...allowedRoles]

    const result = req.roles.map(role => rolesArray.includes(role)).find(result => result === true)
    if (!result) {
      return res.sendStatus(401)
    }
    next()
  };
}

export default verifyRoles