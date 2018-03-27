'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    await ctx.render('index.html');
  }

  async list(ctx){
    const {id} = ctx.params;
    const res =await ctx.service.home.fetchList(id);
    await ctx.render('list.html',{res:res.subjects || 1});
   
  }

  async detail(ctx){
    const {id} = ctx.params;
    const res = await ctx.service.home.fetchDetail(id);
    console.log(res);
    await ctx.render('detail.html',{res:res || 1})
  }
}

module.exports = HomeController;
