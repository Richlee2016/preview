const Service = require("egg").Service;
const rp = require("request-promise-native")
const qs = require("querystring");
const Prefix = "https://api.douban.com"

class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Movie = this.ctx.model.Movie.Movie;
    this.Page = this.ctx.model.Movie.Page;
    this.DouBan = {
      hot: Prefix + "/v2/movie/in_theaters", //正在热映
      soon: Prefix + "/v2/movie/coming_soon", //最近上映
      top250: Prefix + "/v2/movie/top250", //top250
      weekly: Prefix + "/v2/movie/weekly", //
      us: Prefix + "/v2/movie/us_box", //欧美
      newm: Prefix + "/v2/movie/new_movies", //最新
      search: Prefix + "/v2/movie/search", //搜索
      subject: Prefix + "/v2/movie/subject" //单个电影
    }
  }

  async fetchList(type) {
    try {
      let res = await this.Page.findOne({
        type
      }).exec();
      if (!res) {
        switch (type) {
          case "hot":
            res = await this._request(this.DouBan.hot);
            break;
          case "soon":
            res = await this._request(this.DouBan.soon);
            break;
          case "top250":
            res = await this._request(`${this.DouBan.top250}?count=250`);
            break;
          case "weekly":
            res = await this._request(this.DouBan.weekly);
            break;
          case "us":
            res = await this._request(this.DouBan.us);
            break;
          case "newm":
            res = await this._request(this.DouBan.newm);
            break;
        }
        const it = {
          type,
          list: res
        }
        const save = await this.Page.SavePage(it);
        return res;
      }
      return res.list;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchDetail(id) {
    const movie = await this.Movie.findOne({
      id: id
    }).exec();
    if (!movie) {
      const req = await this._request(`${this.DouBan.subject}/${id}`);
      const saveData = {
        _id: req.id,
        id: req.id,
        cover: req.images.medium || req.images.small || req.images.large,
        list: req
      }
      const isMovie = await this.Movie.SaveMovie(saveData);
      this.ctx.app.messenger.sendToApp("video_qiniu", {
        href: isMovie.list.alt,
        movie: isMovie
      });
      return isMovie;
    } else {
      if (!movie.video && !movie.videoKey) {
        this.ctx.app.messenger.sendToApp("video_qiniu", {
          href: movie.list.alt,
          movie
        });
      };
      return movie;
    };
  }

  async fetchSearch(querys) {
    const query = qs(querys);
    return this._request(`${this.DouBan.search}?${query}`);
  }


  async _request(src) {
    try {
      let res = await rp(src);
      return JSON.parse(res);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HomeService;