import { ApplyOptions } from '@sapphire/decorators'
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from '@sapphire/plugin-api'

@ApplyOptions<RouteOptions>({ route: 'shutdown' })
export class UserRoute extends Route {
  public [methods.GET](_request: ApiRequest, response: ApiResponse) {
    this.container.logger.warn('Kubernetes | Shutdown signal received.')
    return (response.statusCode = 200)
  }
}
