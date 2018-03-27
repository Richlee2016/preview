'use strict';

module.exports = appInfo => {
  let config = (exports = {});
  config = {
    keys: appInfo.name + "_1522116013667_2328",
    middleware: ["errorHandler"],
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },
    mongoose: {
      url: "mongodb://localhost:27017/preview",
      options: {}
    }
  };

  return config;
};