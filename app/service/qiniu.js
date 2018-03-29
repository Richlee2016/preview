const Service = require("egg").Service;
const qiniu = require("qiniu");
class QiniuService extends Service {
    constructor(ctx) {
        super(ctx);
        const config = ctx.app.config.richCof;
        this.config = config;
        const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
        const cfg = new qiniu.conf.Config()
        this.bucket = config.qiniu.bucket
        this.client = new qiniu.rs.BucketManager(mac, cfg)
        this.Movie = this.ctx.model.Movie.Movie;
    }
    // 上传封装
    async _uploadToQiniu(url, key) {
        return new Promise((resolve, reject) => {
            console.log(url, key);
            this.client.fetch(url, this.bucket, key, (err, ret, info) => {
                if (err) {
                    reject(err)
                } else {
                    if (info.statusCode === 200) {
                        resolve({
                            key
                        })
                    } else {
                        reject(info)
                    }
                }
            })
        })
    }
    // movie推荐 视频地址
    async movieQiniuUpdate(movie) {
        if (movie.video && !movie.videoKey) {
            try {
                let videoData = await this._uploadToQiniu(movie.video, `douban_video_${movie.id}.mp4`);
                let coverData = await this._uploadToQiniu(movie.cover, `douban_cover_${movie.id}.jpg`);
                if (videoData.key) {
                    movie.videoKey = this.config.qiniu.cname + videoData.key
                }
                if (coverData.key) {
                    movie.coverKey = this.config.qiniu.cname + coverData.key
                }
                const res = await this.Movie.SaveMovie(movie);
                return res;
            } catch (error) {
                console.log(error);
            }
        }
    }

    async movieQiniuGet(key) {
        console.log(key);
        this.client.stat(this.bucket, key, function (err, ret) {
            if (!err) {
                console.log("ret===>",ret);
                console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
            } else {
                console.log(err);
            }
        });
    }
}

module.exports = QiniuService;