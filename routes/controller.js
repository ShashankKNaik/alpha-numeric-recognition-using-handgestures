const user = require('../models/user.schema')

exports.save = (req,res) =>{
    if(req.body.password === req.body.cpassword){

            let newUser = new user({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
            })
        
            newUser.save((err,b)=>{
                if(err){
                    res.render('signup.ejs',{msg:'Email already exists'})
                }
                else{
                    console.log('1 record inserted')
                    res.redirect('/login')
                }
            })
        
    }else
        res.render('signup.ejs',{msg:'Password is not matching'})
}

exports.login=(req,res)=>{
    user.findOne({email:req.body.email}).exec((err,data)=>{
        if(data){
            if(req.body.password === data.password){
                req.session.userId = data.email
                res.redirect('/profile')
            }
            else
                res.render('login.ejs',{msg:'Wrong Password'})
        }
        else
            res.render('login.ejs',{msg:'Signup before login'})
        
    })
}

exports.profile=(req,res)=>{
    user.findOne({email:req.session.userId}).exec((err,data)=>{
        if(data)
            return res.render('index.ejs',{ name:data.name, email:data.email})//
        
        else
            res.redirect('/')
    })
}

exports.logout=(req,res)=>{
    if(req.session){
        res.clearCookie('connect.sid')
        req.session.destroy((err)=>{
            if (err) {
				console.log('error')
			} else {
				return res.redirect('/');
			}
        })
    }
}