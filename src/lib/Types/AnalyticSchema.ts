/**
 * @license Apache License, Version 2.0
 * @copyright 2022 Favware
 *
 */

export const enum Points {
  Guilds = 'guilds',
  Users = 'users'
}

export const enum Tags {
  Shard = 'shard',
  Guild = 'guild_id',
  User = 'user_id',
  Client = 'client_id',
  Action = 'action',
  OriginEvent = 'origin_event',
  MigrationName = 'migration_name',
  ValueType = 'value_type'
}

export const enum Actions {
  Addition = 'addition',
  Subtraction = 'subtraction',
  Sync = 'sync',
  Migration = 'migration'
}
