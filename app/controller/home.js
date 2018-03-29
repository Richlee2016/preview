'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    const hot = await ctx.service.home.fetchList("hot"); 
    const soon = await ctx.service.home.fetchList("soon"); 
    const top250 = await ctx.service.home.fetchList("top250"); 
    const movie = [].concat(hot.subjects,soon.subjects,top250.subjects)
    // const us = await ctx.service.home.fetchList("us"); 
    await ctx.render('index.html',{movie});
  }

  async list(ctx){
    const {id} = ctx.params;
    const res =await ctx.service.home.fetchList(id);  
    console.log(res);
    await ctx.render('list.html',{res:res.subjects || 1});
  }

  async detail(ctx){
    const {id} = ctx.params;
    const res = await ctx.service.home.fetchDetail(id);
    await ctx.render('detail.html',{res:res || 1})
  }
}

module.exports = HomeController;
