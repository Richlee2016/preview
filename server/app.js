import Koa from "koa";
import { resolve } from "path";
const r = (...arg) => resolve(__dirname, ...arg);
const MIDDLEWARES = ["database","general", "router"];

const host = process.env.HOST || "192.168.2.120";
const port = process.env.PORT || 8085;
// const topic = "/\xe6"
// var newtopic = new Buffer(topic,10).toString();//将十六进制的消息转换成string
// console.log(newtopic);
class App {
  constructor() {
    this.app = new Koa();
    this.useMiddleware(this.app)(MIDDLEWARES);
    this.errorHandling();
  }
  useMiddleware(app) {
    return m => {
      m.forEach(o => {
        require(`./middleware/${o}.js`)(app);
      });
    };
  }

  errorHandling() {
    this.app.on("error", (err, ctx) => {
      console.error("server error", err, ctx);
    });
  }

  start() {
    this.app.listen(port,host);
    console.log("Server listening on " + host + ":" + port);
  }
}

const app = new App();
app.start();
