export interface Controller<Req = any, Res = any> {
  handler: (request: Req) => Promise<Res>
}
