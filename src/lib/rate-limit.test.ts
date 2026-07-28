import { test } from "node:test";
import assert from "node:assert/strict";
import { rateLimit, enforceRateLimit, _resetRateLimit } from "./rate-limit.ts";

test("rateLimit : autorise jusqu'à max puis bloque dans la fenêtre", () => {
  _resetRateLimit();
  const key = "t:ip1";
  for (let i = 0; i < 3; i++) assert.equal(rateLimit(key, 3, 60_000).allowed, true);
  const blocked = rateLimit(key, 3, 60_000);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterMs > 0);
});

test("enforceRateLimit : repli mémoire quand Upstash non configuré", async () => {
  _resetRateLimit();
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  const key = "t:ip2";
  assert.equal((await enforceRateLimit(key, 2, 60_000)).allowed, true);
  assert.equal((await enforceRateLimit(key, 2, 60_000)).allowed, true);
  assert.equal((await enforceRateLimit(key, 2, 60_000)).allowed, false);
});
