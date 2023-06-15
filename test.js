/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('mdast').Paragraph} Paragraph
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAllBetween} from './index.js'
import * as mod from './index.js'

const tree = fromMarkdown('Some *emphasis*, **importance**, and `code`.')
const paragraph = /** @type {Paragraph} */ (tree.children[0])
const children = paragraph.children

test('findAllBetween', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['findAllBetween'],
    'should expose the public api'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllBetween()
    },
    /Expected parent node/,
    'should fail without parent'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllBetween({type: 'foo'})
    },
    /Expected parent node/,
    'should fail without parent node'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllBetween({type: 'foo', children: []})
    },
    /Expected child node or index for start/,
    'should fail without any index'
  )

  assert.throws(
    () => {
      findAllBetween({type: 'foo', children: []}, -1, 2)
    },
    /Expected positive finite number as index for start/,
    'should fail with invalid index (#1)'
  )

  assert.throws(
    () => {
      findAllBetween({type: 'foo', children: []}, Number.POSITIVE_INFINITY, 2)
    },
    /Expected positive finite number as index for start/,
    'should fail with invalid index (#2)'
  )

  assert.throws(
    () => {
      findAllBetween({type: 'foo', children: []}, 2, -1)
    },
    /Expected positive finite number as index for end/,
    'should fail with invalid index (#3)'
  )

  assert.throws(
    () => {
      findAllBetween({type: 'foo', children: []}, 2, Number.POSITIVE_INFINITY)
    },
    /Expected positive finite number as index for end/,
    'should fail with invalid index (#4)'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllBetween({type: 'foo', children: []}, false)
    },
    /Expected child node or index for start/,
    'should fail with invalid index (#5)'
  )

  assert.throws(
    () => {
      findAllBetween({type: 'foo', children: []}, -1, 1)
    },
    /Expected positive finite number as index for start/,
    'should fail with invalid index (#6)'
  )

  assert.throws(
    () => {
      findAllBetween({type: 'foo', children: []}, {type: 'bar'}, 1)
    },
    /Expected child node/,
    'should fail with invalid index (#7)'
  )

  assert.throws(
    () => {
      findAllBetween(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        0,
        // @ts-expect-error runtime.
        false
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#1)'
  )

  assert.throws(
    () => {
      findAllBetween(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        0,
        // @ts-expect-error runtime.
        true
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#2)'
  )

  assert.deepEqual(
    findAllBetween(paragraph, children[1], children[4]),
    children.slice(2, 4),
    'should return the following node when without `test` (#1)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 1, 4),
    children.slice(2, 4),
    'should return the following node when without `test` (#2)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[1], children[2]),
    [],
    'should return the following node when without `test` (#1)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 1, 2),
    [],
    'should return the following node when without `test` (#3)'
  )

  assert.deepEqual(
    findAllBetween(paragraph, 0, children[2]),
    [children[1]],
    'should return `node` when given a `node` and existing (#1)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[0], children[2]),
    [children[1]],
    'should return `node` when given a `node` and existing (#2)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 1, children[4]),
    [children[2], children[3]],
    'should return `node`s when given a `node` and existing (#3)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[0], children[0]),
    [],
    'should return `node` when given a `node` and existing (#4)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 0, children[1]),
    [],
    'should return `node` when given a `node` and existing (#5)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 1, children[1]),
    [],
    'should return `node` when given a `node` and existing (#6)'
  )

  assert.deepEqual(
    findAllBetween(paragraph, 0, 6, 'strong'),
    [children[3]],
    'should return a child when given a `type` and existing (#1)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 3, 6, 'strong'), // since the index 3 is a strong and the start is excluded
    [],
    'should return a child when given a `type` and existing (#2)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[0], children[5], 'strong'),
    [children[3]],
    'should return a child when given a `type` and existing (#3)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[3], children[6], 'strong'),
    [],
    'should return a child when given a `type` and existing (#4)'
  )

  assert.deepEqual(
    findAllBetween(paragraph, 0, 6, check),
    [children[5]],
    'should return a child when given a `test` and existing (#1)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, 5, 6, check),
    [],
    'should return a child when given a `test` and existing (#2)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[4], children[6], check),
    [children[5]],
    'should return a child when given a `test` and existing (#3)'
  )
  assert.deepEqual(
    findAllBetween(paragraph, children[0], children[5], check),
    [],
    'should return a child when given a `test` and existing (#4)'
  )

  /**
   * @param {Node} _
   * @param {number | null | undefined} n
   */
  function check(_, n) {
    return typeof n === 'number' && n >= 5
  }
})
