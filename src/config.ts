/**
 * Author: TMUniversal
 * Licensed under the MIT License
 */
import appRootPath from 'app-root-path'
import convict from 'convict'
import type { Snowflake } from 'discord.js'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

interface Configuration {
  version?: string | number
  token: string
  webhook: string
  ksoft: string
  prefix: string
  owners: Snowflake | Snowflake[]
  e621?: {
    username: string
    api_key: string
  }
  mongo: {
    uri: string
  }
  sentry: string
}

export interface PackageJson {
  name: string
  version: string
  description: string
  main: string
  scripts: {
    [name: string]: string
  }
  authors: string[]
  contributors: string[]
  license: string
  devDependencies?: {
    [packageName: string]: string
  }
  dependencies?: {
    [packageName: string]: string
  }
  repository?: {
    type: string
    url: string
  }
  keywords?: string[]
  bugs?: {
    url: string
  }
  homepage?: string
}

const isWebhook = (v: unknown): boolean =>
  typeof v === 'object' &&
  Object.prototype.hasOwnProperty.call(v, 'id') &&
  Object.prototype.hasOwnProperty.call(v, 'secret')

convict.addFormat({
  name: 'webhook',
  validate: isWebhook
})

const config = convict<Configuration>({
  version: {
    format: v => /(\d+\.\d+\.\d+)(-[\w\d-.]*)?/.test(v),
    default: '0'
  },
  token: {
    format: v => typeof v === 'string' && !!v && v.length < 30,
    arg: 'token',
    default: ''
  },
  webhook: {
    format: String,
    default: ''
  },
  prefix: {
    format: String,
    arg: 'prefix',
    default: '.'
  },
  owners: {
    format: Array,
    default: []
  },
  ksoft: {
    format: String,
    default: ''
  },
  e621: {
    username: {
      format: String,
      default: ''
    },
    api_key: {
      format: String,
      default: ''
    }
  },
  mongo: {
    uri: {
      format: String,
      default: ''
    }
  },
  sentry: {
    format: String,
    default: ''
  }
})

if (existsSync(join(appRootPath.path, 'config', 'main.json'))) {
  config.loadFile(join(appRootPath.path, 'config', 'main.json'))
}

export const pkg: PackageJson = JSON.parse(readFileSync(join(appRootPath.path, 'package.json'), { encoding: 'utf-8' }))

config.set('version', pkg.version)

config.validate({ allowed: 'strict' })

export default config.getProperties()
