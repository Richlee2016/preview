module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const Mixed = Schema.Types.Mixed;
  const PageSchema = new mongoose.Schema({
    type:String,
    list:Mixed,
    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      },
      updateAt: {
        type: Date,
        default: Date.now()
      }
    }
  });

  PageSchema.pre("save", function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  PageSchema.statics = {
    async SavePage(data) {
      let page = await this.findOne({ type:data.type }).exec();
      const _page = Object.assign({},data);
      if (page) {
        page = Object.assign(page,_page);
      } else {
        page = new Page(_page);
      }
      try {
        const res = await page.save();
        console.log(`${data.type}更新成功`);
        return res;
      } catch (error) {
        console.log(`${data.type}更新失败`);
        console.log(error);
      }
    }
  };

  const Page = mongoose.model("t_page_list", PageSchema);
  return Page;
};
