
module.exports = {
    loginHome : (req, res, next) =>{
        session = req.session;
        if ( session.user != null ) next();
        else res.redirect("/");
    },
    loginIndex : (req, res, next) =>{
        session = req.session;
        if ( session.user != null ) res.redirect("home/");
        else next();
    }
}