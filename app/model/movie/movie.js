module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const Mixed = Schema.Types.Mixed;
  const MovieSchema = new mongoose.Schema({
    _id: Number,
    id:Number,
    video:String,
    videoKey:String,
    cover:String,
    coverKey:String,
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

  MovieSchema.pre("save", function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  MovieSchema.statics = {
    async SaveMovie(data) {
      let movie = await this.findOne({ id:data.id }).exec();
      const _movie = Object.assign({},data);
      if (movie) {
        movie = Object.assign(movie,_movie);
      } else {
        movie = new Movie(_movie);
      }
      try {
        const res = await movie.save();
        console.log(`${data.list.title}更新成功`);
        return res;
      } catch (error) {
        console.log(`${data.list.title}更新失败`);
        console.log(error);
      }
    }
  };

  const Movie = mongoose.model("t_movie_list", MovieSchema);
  return Movie;
};
