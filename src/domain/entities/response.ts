export class Response {
  private constructor(readonly statusCode: number, readonly data: any) {}

  static ok(data: any): Response {
    return new Response(200, data)
  }

  static created(data: any): Response {
    return new Response(201, data)
  }

  static noContent(): Response {
    return new Response(204, null)
  }
}
