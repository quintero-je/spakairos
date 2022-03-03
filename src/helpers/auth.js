const helpers = {};
const Level = require('../models/Level');

helpers.isAuthenticated = async(req, res, next) => {

  /*   if (req.isAuthenticated()) {

        //Global data to views
        res.locals.levels = await Level.find();
        res.locals.user = req.user;


        return next();
    }
    req.flash('error_msg', 'Not Authorized.');
    res.redirect('/users/signin'); */
     return next();
};
helpers.employeeCheck = (req, res, next) => {

};

module.exports = helpers;