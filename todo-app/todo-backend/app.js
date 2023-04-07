const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path')

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics')

const app = express();

// app.use(express.static(path.join(__dirname, '../todo-frontend/build')))

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/index', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

module.exports = app;
