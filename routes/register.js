let express = require('express');
let router = express.Router();
let db = require('../config/db');

/* GET home page. */
router.get('/',(req,res)=>{
    res.render('register')
})
router.post('/', function(req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let repassword = req.body.repassword;
    if(name==''){
        res.send('用户名不能为空')
    }else if(password != repassword){
        res.send('两次密码不一致')
    }else {
        let sql = "insert into user(name,email,password,repassword) values('"+name+"','"+ email +"','"+ password +"','"+ repassword +"')"
        db.query(sql,(err,rows)=>{
            if(err)throw err
            res.redirect('/login')
        })
    }


});

module.exports = router;