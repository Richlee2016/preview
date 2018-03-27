'use strict';

const Controller = require('egg').Controller;

class MovieController extends Controller {

  async search(ctx){
    const query = ctx.request;
    console.log(query);
    ctx.body = 2
  }
}

module.exports = MovieController;
