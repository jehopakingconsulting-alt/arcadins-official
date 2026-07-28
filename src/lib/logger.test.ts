import { test } from "node:test";
import assert from "node:assert/strict";
import { log, logger } from "./logger.ts";

function capture(fn: () => void): string[] {
  const lines: string[] = [];
  const orig = { log: console.log, warn: console.warn, error: console.error };
  console.log = console.warn = console.error = (s: unknown) => { lines.push(String(s)); };
  try { fn(); } finally { Object.assign(console, orig); }
  return lines;
}

test("log : JSON structuré avec niveau, message et champs", () => {
  const [line] = capture(() => log("info", "hello", { a: 1, b: "x" }));
  const rec = JSON.parse(line);
  assert.equal(rec.level, "info");
  assert.equal(rec.msg, "hello");
  assert.equal(rec.a, 1);
  assert.equal(rec.b, "x");
  assert.ok(typeof rec.ts === "string");
});

test("logger.error : route vers console.error", () => {
  const lines = capture(() => logger.error("boom", { code: 500 }));
  assert.equal(lines.length, 1);
  assert.equal(JSON.parse(lines[0]).level, "error");
});
