const user = require('../models/user.schema')

exports.signup = (req,res) =>{
    if(req.body.password === req.body.cpassword){

            let newUser = new user({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
            })
        
            newUser.save((err,b)=>{
                if(err){
                    res.send('<span class="warning">Email already exists</span>')
                }
                else{
                    res.send('<span class="success">Signup Success</span>')
                }
            })
        
    }else
        res.send('<span class="warning">Password is not matching</span>')
}

exports.login=(req,res)=>{
    user.findOne({email:req.body.email}).exec((err,data)=>{
        if(data){
            if(req.body.password === data.password){
                req.session.userId = data.email
                res.send('success')
            }
            else
                res.send('<span class="error">Wrong Password</span>')
        }
        else
            res.send('<span class="warning">Signup before login</span>')
        
    })
}

exports.index=(req,res)=>{
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