/**
 * @license Apache License, Version 2.0
 * @copyright Skyra Project
 *
 */

import { envParseBoolean, envParseString } from '#lib/env/parser'
import { InfluxDB, QueryApi, WriteApi } from '@influxdata/influxdb-client'

export default class AnalyiticData {
  public influx: InfluxDB | null = envParseBoolean('INFLUX_ENABLED') ? new InfluxDB(parseConfig()) : null

  public writeApi!: WriteApi
  public queryApi!: QueryApi

  public messages: number

  constructor() {
    this.queryApi = this.influx.getQueryApi(envParseString('INFLUX_ORG'))
    this.writeApi = this.influx.getWriteApi(envParseString('INFLUX_ORG'), envParseString('INFLUX_BUCKET'), 's')

    this.messages = 0
  }
}

function parseConfig() {
  const url = envParseString('INFLUX_URL')
  const token = envParseString('INFLUX_TOKEN')

  return {
    url,
    token
  }
}
