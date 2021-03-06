'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //page
  router.get('/', controller.home.index);
  router.get('/list/:id', controller.home.list);
  router.get('/detail/:id', controller.home.detail);
  //api
  router.post('/api/search',controller.movie.search);
};
