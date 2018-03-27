'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    await ctx.render('index.html');
  }

  async list(ctx){
    const {id} = ctx.params;
    const res =await ctx.service.home.fetchList(id);
    await ctx.render('list.html',{res:JSON.stringify(res) || 1});
   
  }

  async detail(ctx){
    const {id} = ctx.params;
    await ctx.render('detail.html',{id})
  }
}

module.exports = HomeController;
