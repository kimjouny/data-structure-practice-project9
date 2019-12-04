const express=require('express')
const createError = require('http-errors');
const bodyParser=require('body-parser');
const logger=require('morgan');
const ejs = require('ejs'); 
const app=express()

app.set('views',__dirname+'/views')
app.set('view engine','html')
app.engine('html',ejs.renderFile)
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render("main.html")
})

app.use(function(req, res, next) {
    next(createError(404));
});
  

app.listen(8080,()=>console.log('Server running at port 8080'))