import { ApplyOptions } from '@sapphire/decorators'
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from '@sapphire/plugin-api'

@ApplyOptions<RouteOptions>({ route: 'members' })
export class UserRoute extends Route {
  public [methods.GET](_request: ApiRequest, response: ApiResponse) {
    return response.json({ ping: this.container.client.ws.ping })
  }
}
