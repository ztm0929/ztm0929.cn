import assert from 'node:assert/strict';
import test from 'node:test';

import { isSameLocation } from './same-location';

test('treats an active sidebar link to the current URL as redundant navigation', () => {
  assert.equal(
    isSameLocation(
      'https://ztm0929.cn/docs/toolchain/docker/install/',
      'https://ztm0929.cn/docs/toolchain/docker/install/',
    ),
    true,
  );
});

test('allows navigation when the path, query, or hash changes', () => {
  const current = 'https://ztm0929.cn/docs/toolchain/docker/install/';

  assert.equal(isSameLocation('https://ztm0929.cn/docs/toolchain/docker/', current), false);
  assert.equal(isSameLocation(`${current}?view=raw`, current), false);
  assert.equal(isSameLocation(`${current}#requirements`, current), false);
});
