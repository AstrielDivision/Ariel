import '@sapphire/plugin-i18next/register'
import '@sapphire/plugin-logger/register'
import 'reflect-metadata'
import { inspect } from 'util'

process.env.NODE_ENV ??= 'development'

inspect.defaultOptions.depth = 1
