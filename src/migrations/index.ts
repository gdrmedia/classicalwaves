import * as migration_20260424_013944_initial from './20260424_013944_initial';
import * as migration_20260424_033512 from './20260424_033512';

export const migrations = [
  {
    up: migration_20260424_013944_initial.up,
    down: migration_20260424_013944_initial.down,
    name: '20260424_013944_initial',
  },
  {
    up: migration_20260424_033512.up,
    down: migration_20260424_033512.down,
    name: '20260424_033512'
  },
];
