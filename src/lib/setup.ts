import '@sapphire/plugin-api/register'
import '@sapphire/plugin-i18next/register'
import '@sapphire/plugin-scheduled-tasks/register-redis'
import 'reflect-metadata'
import { inspect } from 'util'

process.env.NODE_ENV ??= 'development'

inspect.defaultOptions.depth = 1
