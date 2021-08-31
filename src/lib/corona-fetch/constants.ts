import { pkg } from '../../config'

export default {
  baseURL: 'https://disease.sh/v3/covid-19',
  useragent: `Astraea/v${pkg.version} (github.com/AstraeaStudios/Astraea)`,
  endpoint: {
    all: '/all',
    country: '/countries'
  }
}
