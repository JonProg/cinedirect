const Contact = require('../models/ContactModel');                                                       

exports.index = async (req,res) => {
    return res.render('index');
};