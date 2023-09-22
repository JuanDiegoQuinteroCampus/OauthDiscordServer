const checkAuthentication = (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/Bienvenidos");

export default checkAuthentication;