import { controller, all, post, get, sayError } from "../decorator/router";

@controller("/")
export class Preview {
  constructor() {}

  @get("/")
  async fetchFreeBook(ctx, next) {
   ctx.body = 1;
   ctx.status = 200;
  }
}
