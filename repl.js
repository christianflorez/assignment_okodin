const repl = require('repl').start({});
const models = require('./models');

repl.context.models = models;

Object.keys(models).forEach(modelName => {
  repl.context[modelName] = models[modelName];
});

repl.context.lg = data => {
  if (Array.isArray(data)) {
    if (data.length && data[0].dataValues) {
      data = data.map(item => item.dataValues);
    }
  } else {
    if (data.dataValues) {
      data = data.dataValues;
    }
  }
  console.log(data);
};