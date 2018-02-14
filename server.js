const express=require('express');
const hbs=require('hbs');

const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{return new Date().getFullYear()});

hbs.registerHelper('screamIt',(msg)=>{
	return msg.toUpperCase();
});

//middleware creation
app.use((req,res,next)=>{
	var log=`${new Date().toString()}: ${req.method} ${req.url}`;
	console.log(log);
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
	// res.send(`<h1>Hello express!!</h1>`);
	res.render('home.hbs',{pageTitle:'Home',welcomeMessage:'Welcome User'});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{pageTitle:'About'});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'Unable to fulfill this request'
	});
});

app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});