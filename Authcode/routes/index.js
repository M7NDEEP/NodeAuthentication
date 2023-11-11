var express = require('express');
var router = express.Router();
const usermodel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(usermodel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',isLoggedIn,(req,res)=>{
  res.send("This is your profile section")
});

router.post('/register',(req,res)=>{
  var userdata = new usermodel({
    username:req.body.username,
    secret:req.body.secret,
  })
  
  usermodel.register(userdata,req.body.password)
  .then((registereduser)=>{
    passport.authenticate("local")(req,res,()=>{
      res.redirect('/profile')
    })
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login'
}),(req,res)=>{})

router.get('/logout',(req,res,next)=>{
  req.logout(function(err){
    if(err) return next(err);
    res.redirect('/')
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}
module.exports = router;
