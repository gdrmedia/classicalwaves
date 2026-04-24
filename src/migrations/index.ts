import * as migration_20260424_013944_initial from './20260424_013944_initial';

export const migrations = [
  {
    up: migration_20260424_013944_initial.up,
    down: migration_20260424_013944_initial.down,
    name: '20260424_013944_initial'
  },
];
