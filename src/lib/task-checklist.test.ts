import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getChecklistStorageKey,
  parseChecklistState,
  serializeChecklistState,
} from './task-checklist';

test('scopes checklist persistence to the current document path', () => {
  assert.equal(
    getChecklistStorageKey('/docs/toolchain/docker/install/'),
    'docs-checklist:/docs/toolchain/docker/install/',
  );
  assert.notEqual(
    getChecklistStorageKey('/docs/toolchain/docker/install/'),
    getChecklistStorageKey('/docs/toolchain/git/install/'),
  );
});

test('keeps only completed task identifiers when reading persisted state', () => {
  assert.deepEqual(
    parseChecklistState('{"0:linux":true,"1:sudo":false,"bad":"yes"}'),
    { '0:linux': true },
  );
  assert.deepEqual(parseChecklistState('not json'), {});
});

test('serializes completed task identifiers for local storage', () => {
  assert.equal(
    serializeChecklistState({ '0:linux': true, '1:sudo': false }),
    '{"0:linux":true}',
  );
});
