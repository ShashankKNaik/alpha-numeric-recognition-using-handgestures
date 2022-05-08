const express = require('express')
const spawn = require('child_process').spawn

const mongoose = require("mongoose")
const ejs = require("ejs")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const cors=require('cors')


const app = express()
const path = __dirname  + '/views'

const PORT = process.env.PORT || 3001


mongoURI = 'mongodb://localhost:27017/AlpaNumeric'

app.use(express.static(path))

app.use(express.json())
app.use(express.urlencoded({
	extended:false
}))

app.use(cors({
	credentials: true,
}));


mongoose.connect(mongoURI,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
mongoose.set('useCreateIndex', true) // to remove (node:8172) DeprecationWarning

db = mongoose.connection
db.on('error', console.error.bind("Database connection error"))
db.once('open', () => {
	console.log("Database connected")
})


app.set("view engine", "ejs")
app.use(express.static(__dirname + '/views'))  // to serve the static files


app.use(session({
	secret:'5^$#8gtg(2esff-)87',
	resave:true,                // it updates the database session each time we visit the page
	rolling:true,				// it updates the cookie maxAge each time we visit the page
	saveUninitialized:false,
	store:MongoStore.create({
		mongoUrl:mongoURI
	}),
	cookie:{
		maxAge: 1000*60*60*24*7 // 7 Days
	}
}))

app.post('/home',(req,res)=>{
    handArray = req.body.handArray
	// console.log(handArray)

    var dataToSend;

    let pyfile = 'recognise.py'
    let error = false

    const python = spawn('python', [pyfile, handArray]);
    
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });
    
    python.stderr.on('data',(err)=>{
        console.log(err.toString())
        error = true
    })
    
    python.on('close', (code) => {
        if(error == false){
			res.send(dataToSend[2])
			console.log(dataToSend[2])
		}
            
        else
            res.send('error')
    });
})


require('./routes/router')(app) // calling the function which is in router.js file

app.listen(PORT,()=>{
	console.log('(ctrl + click) http://localhost:3001/')
})