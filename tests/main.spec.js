import assert from "node:assert/strict";
import test from "node:test";

test("unist-util-find-between", async function (t) {
  await t.test("should expose two public apis", async function () {
    assert.deepEqual(Object.keys(await import("../src/index.js")).sort(), [
      "findBetween",
      "findBetweenIncluded",
    ]);
  });
});
