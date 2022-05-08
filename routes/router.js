module.exports = (app) => {
    const router = require("express").Router()
    const controller = require('./controller') // to call the function which is exported in controller.js file

    router.get("/",(req,res) =>{
        if(req.session.userId == undefined)	
            res.render('signup.ejs',{msg:''})
        else
            res.redirect('/profile')
    })
    
    router.get("/login",(req,res) =>{
        res.render('login.ejs',{msg:''})
    })

    router.post('/',controller.save)

    router.post('/login',controller.login)

    router.get('/profile',controller.profile)

    router.get('/logout',controller.logout)

    app.use(router)
}