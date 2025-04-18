var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.js');
var secretariaRouter= require('./routes/secretaria.js')
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('view cache', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const db = require('./database/models');
/*
async function initialize() {
  try {
    await db.sequelize.authenticate();
    console.log('✓ Conexión a DB establecida');
    
    // Sincronización segura (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: true });
      console.log('✓ Modelos sincronizados');
      
      // Verificación de datos
      const secretarias = await db.Secretarias.findAll();
      console.log(`✓ ${secretarias.length} registros en Secretarias`);
    }
    
    // Inicia el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✓ Servidor en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('✗ Error de inicialización:', error);
    process.exit(1);
  }
}

initialize();*/

app.use('/', indexRouter);
app.use('/', secretariaRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
