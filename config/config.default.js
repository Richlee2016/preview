'use strict';

module.exports = appInfo => {
  let config = (exports = {});
  config = {
    richCof: {
      qiniu: {
        cname: "http://go.richfly.cn/",
        bucket: "eggapi",
        AK: "OBDA2gN9-FJfAzWExCHGNNG9QW5FqNtUrD57IwIi",
        SK: "lkrOjtgXY4WmN7NcJNSKNXb7aLue13_CPg_0X0NH"
      }
    },
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