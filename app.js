// Gerekli modüllerin import edilmesi
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const expressSession = require("express-session");
const SessionStore = require('express-session-sequelize')(expressSession.Store);
const sequelize = require('./data/db');
const locals = require("./middlewares/locals");

// Router'ların import edilmesi
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Express uygulamasının oluşturulması
const app = express();
dotenv.config(); // Dotenv konfigürasyonu

// View engine'in setup edilmesi
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Statik dosyaların servis edilmesi
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

// Logger ve middleware'lerin kullanılması
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(expressSession({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
  store: new SessionStore({
    db: sequelize
  })
}));
app.use(locals);
app.use(express.static(path.join(__dirname, 'public')));

// Router'ların tanımlanması
app.use('/', indexRouter);
app.use('/user', usersRouter);

// Sequelize ve User modelinin import edilmesi
const User = require('./models/user');

// Sequelize sync fonksiyonunun çağrılması (opsiyonel, veritabanı ile senkronize etmek için kullanılır)
// (async () => {
//     await sequelize.sync({ force: true });
// })();

// 404 hatasını yakalayan middleware
app.use(function (req, res, next) {
  next(createError(404));
});

// Hata işleme middleware'i
app.use(function (err, req, res, next) {
  // Sadece development ortamında hata bilgilerini sağlar
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Hata sayfasını render etme
  res.status(err.status || 500);
  // res.render('error');
});

// Uygulamanın dışa aktarılması
module.exports = app;