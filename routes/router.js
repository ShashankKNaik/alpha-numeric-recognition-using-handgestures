module.exports = (app) => {
    const router = require("express").Router()
    const controller = require('./controller') // to call the function which is exported in controller.js file

    router.get("/",(req,res) =>{
        if(req.session.userId == undefined)	
            res.render('home.ejs')
        else
            res.redirect('/index')
    })
    
    router.get("/login",(req,res) =>{
        res.render('login.ejs')
    })

    router.post('/login',controller.login)

    router.post('/signup',controller.signup)

    router.get('/index',controller.index)

    router.get('/logout',controller.logout)

    app.use(router)
}