const {body} = require('express-validator')
const {validationResult} = require('express-validator')

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};


exports.validateSignUp = [
    body('firstName','First name cannot be empty').notEmpty().trim().escape(),
    body('lastName','Last name cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be 8 characters and atmost 64 characters').isLength({min:8 , max:64})
]

exports.validateLogIn = [
    body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be 8 characters and atmost 64 characters').isLength({min:8 , max:64})
]


exports.validateResult = (req,res,next) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        errors.array().forEach(error =>{
            req.flash('error',error.msg)
        })
        return res.redirect('back')
    }else{
        return next();
    }
}

exports.validatetrade = [
    body('title','Title cannot be empty').notEmpty().trim().escape(),
    body('details','Content name cannot be empty').isLength({min:10}).trim().escape(),
    body('category','Category cannot be empty').isLength({min:10}).trim().escape(),
    body('details','details cannot be empty').isLength({min:10}).trim().escape(),
    body("image", "image link cannot be empty").notEmpty()
]
