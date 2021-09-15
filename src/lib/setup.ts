import '@sapphire/plugin-api/register'
import '@sapphire/plugin-i18next/register'
import { options as coloretteOptions } from 'colorette'
import 'reflect-metadata'
import { inspect } from 'util'

inspect.defaultOptions.depth = 1
coloretteOptions.enabled = true
