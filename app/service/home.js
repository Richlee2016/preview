const Service = require("egg").Service;
const rp = require("request-promise-native")

const Prefix = "https://api.douban.com"

class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Movie = this.ctx.model.Movie.Movie;
    this.DouBan = {
      hot: Prefix + "/v2/movie/in_theaters",
      soon: Prefix + "/v2/movie/coming_soon",
      top250: Prefix + "/v2/movie/top250",
      weekly: Prefix + "/v2/movie/weekly",
      us: Prefix + "/v2/movie/us_box",
      newm: Prefix + "/v2/movie/new_movies"
    }
  }

  async fetchList(type) {
    switch (type) {
      case "1":
        return await this._request(this.DouBan.hot)
        break;
      case "2":
        return await this._request(this.DouBan.soon)
        break;
      case "3":
        return await this._request(this.DouBan.top250)
        break;
      case "4":
        return await this._request(this.DouBan.weekly)
        break;
      case "5":
        return await this._request(this.DouBan.us)
        break;
      case "6":
        return await this._request(this.DouBan.newm)
        break;
    }
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