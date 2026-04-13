// Permet de gérer les erreurs dans les fonctions asynchrones sans try/catch dans chaque route
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
