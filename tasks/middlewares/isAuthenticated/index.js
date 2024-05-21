function isAuthenticated(req, res, next) {
  // je dois récupérer le token dans le cookie
  // je dois vérifier si le token est valide
  // si le token est valide je dois appeler next
  // si non je renvoie une erreur (res.status(401).json({message: "Unauthorized"})

  next();
}

export default isAuthenticated;
