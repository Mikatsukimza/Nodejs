/*express接受hbs传递的参数*/
var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');
var nodemailer = require('./nodemailer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
let codeID = '';
app.use(multer);
/*配置Mysql*/
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'fornode'
});
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

});

function createCode() {
  let num = '';
  for (let i = 0; i < 6; ++i) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

function Test(email) {
  let str = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return str.test(email);
}
//获取邮箱验证码
router.get('/email', (req, res, next) => {
  codeID = createCode()
  console.log('codeID', codeID);
  nodemailer.sendMailS(req, res, codeID);
})
/* 设置home页面(未登录) */
router.get('/', function (req, res, next) {
  res.render('index');
});

/*设置注册页面 */
router.post('/register', function (req, res, next) {
  console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let rePassword = req.body.rePassword;
  let code1 = req.body.code;
  var sql = `insert into userInfo values('` + username + `','` + email + `','` + password + `')`;
  var sqlSearch = `select email from userInfo where email='` + email + `'`;
  var str = '';
  console.log('code1:' + code1)
  var lock = 0;
  connection.query(sqlSearch, function (err, rows) {
    if (err) {
      res.send(err);
      console.log(err);
    } else if (rows[0] == 0) { //如果数据库里查不到email，则可以注册
      lock = 1;
    }
  });
  connection.query(sql, function (err, rows) {
    if (err) {
      res.send(err);
      console.log(err);
    } else if (!lock) {
      res.send({
        code: '0',
        msg: '用户已被注册'
      });
    } else if (codeID != code1) {
      res.send({
        code: '3',
        msg: '验证码不正确'
      })
    } else if (password != rePassword) {
      res.send({
        code: '4',
        msg: '两次密码输入不一致'
      })
    } else {
      res.send({
        code: '2',
        msg: '注册成功'
      })
    }
  })
});

router.get('/register', function (req, res, next) {
  res.render('register');
})
/*设置登录页面 */
router.post('/login', function (req, res, next) {
  var sql = `select email,password from userInfo where email='` + req.body.username +
    `' and password='` + req.body.password + `'`;

  connection.query(sql, function (err, rows) {
    if (err) {
      res.send(err);
      console.log(err);
    }
    console.log(rows);
    if (rows.length == 0) {
      res.send({
        code: '0',
        msg: '用户不存在'
      });
    } else if (rows[0].password == req.body.password) {
      res.send({
        code: '2',
        msg: '登录成功'
      });
    } else {
      res.send({
        code: '1',
        msg: '密码错误'
      });
    }
  });
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
/* 设置home页面(已登录) */
router.get('/home', function (req, res, next) {
  res.render('index1');

});
/*GET checkPage page */
router.get('/checkPage', function (req, res, next) {
  res.render('checkPage');
})
/* GET sharePage page*/
router.get('/sharepage', function (req, res, next) {
  res.render('sharepage');
});

/* GET personinfo page*/
router.get('/personinfo', function (req, res, next) {
  res.render('personinfo');
});
/* GET travelList page*/
router.get('/travelList', function (req, res, next) {
  res.render('travelList');
});
/* GET shimakazecircle page*/
router.get('/shimakazecircle', function (req, res, next) {
  res.render('shimakazecircle');
});
/* GET kazecircle page*/
router.get('/kazecircle', function (req, res, next) {
  res.render('kazecircle');
});

module.exports = router;