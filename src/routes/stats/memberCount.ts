import { ApplyOptions } from '@sapphire/decorators'
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from '@sapphire/plugin-api'

@ApplyOptions<RouteOptions>({ route: 'members' })
export class UserRoute extends Route {
  public [methods.GET](_request: ApiRequest, response: ApiResponse) {
    return response.json({ count: this.container.client.users.cache.size })
  }
}
