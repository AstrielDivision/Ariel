/**
 * Author: TMUniversal
 * Licensed under the MIT License
 */
import appRootPath from 'app-root-path'
import convict from 'convict'
import type { Snowflake } from 'discord.js'
import dotenv from 'dotenv'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

dotenv.config()

interface Configuration {
  version?: string | number
  token: string
  webhook: string
  ksoft: string
  prefix: string
  owners: Snowflake | Snowflake[]
  sentry?: string
  e621?: {
    username: string
    api_key: string
  }
  mongo: {
    uri: string
  }
  stats?: {
    topgg?: string
    discords?: string
  }
}

interface Contributor {
  name: string
  email: string
  url: string
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
  contributors: Contributor[]
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

const config = convict<Configuration>({
  version: {
    format: v => /(\d+\.\d+\.\d+)(-[\w\d-.]*)?/.test(v),
    default: '0'
  },
  token: {
    format: v => typeof v === 'string' && !!v && v.length < 30,
    default: '',
    env: 'TOKEN'
  },
  webhook: {
    format: String,
    default: '',
    env: 'WEBHOOK_URL'
  },
  prefix: {
    format: String,
    default: '.',
    env: 'PREFIX'
  },
  owners: {
    format: Array,
    default: [],
    env: 'OWNERS'
  },
  ksoft: {
    format: String,
    default: '',
    env: 'KSOFT_TOKEN'
  },
  e621: {
    username: {
      format: String,
      default: '',
      env: 'E621_USER'
    },
    api_key: {
      format: String,
      default: '',
      env: 'E621_API_KEY'
    }
  },
  mongo: {
    uri: {
      format: String,
      default: '',
      env: 'MONGO_URI'
    }
  },
  sentry: {
    format: String,
    default: '',
    env: 'SENTRY_URI'
  },
  stats: {
    topgg: {
      format: String,
      default: '',
      env: 'TOP_GG_TOKEN'
    },
    discords: {
      format: String,
      default: '',
      env: 'DISCORDS_TOKEN'
    }
  }
})

if (existsSync(join(appRootPath.path, 'config', 'main.json'))) {
  config.loadFile(join(appRootPath.path, 'config', 'main.json'))
}

export const pkg: PackageJson = JSON.parse(readFileSync(join(appRootPath.path, 'package.json'), { encoding: 'utf-8' }))

config.set('version', pkg.version)

config.validate({ allowed: 'strict' })

export default config.getProperties()
