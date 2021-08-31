export interface All {
  updated: number
  cases: number
  todayCases: number
  deaths: number
  todayDeaths: number
  recovered: number
  todayRecovered: number
  active: number
  critical: number
  casesPerOneMillion: number
  deathsPerOneMillion: number
  tests: number
  testsPerOneMillion: number
  population: number
  oneCasePerPeople: number
  oneDeathPerPeople: number
  oneTestPerPeople: number
  activePerOneMillion: number
  recoveredPerOneMillion: number
  criticalPerOneMillion: number
  affectedCountries: number
}

export interface Country extends All {
  country: string
  continent: string
  countryInfo: {
    _id: number
    iso2: string
    iso3: string
    lat: number
    long: number
    flag: string
  }
}
