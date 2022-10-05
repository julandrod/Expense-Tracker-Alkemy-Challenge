const routeNotFoundMiddleware = (req, res) =>
  res.status(404).send("Esta ruta no existe");

export default routeNotFoundMiddleware;