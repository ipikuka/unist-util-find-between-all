/**
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('unist').Node} UnistNode
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAllBetween} from '../src/index.js'

test('findAllBetween', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('../src/index.js')).sort(), ['findAllBetween'])
  })

  const tree = fromMarkdown('Some *emphasis*, **importance**, and `code`.')

  assert.ok(tree.type === 'root')
  const paragraph = tree.children[0]
  assert.ok(paragraph.type === 'paragraph')
  const head = paragraph.children[0]
  assert.ok(head.type === 'text')
  const next = paragraph.children[1]
  assert.ok(next.type === 'emphasis')

  /** @type {Emphasis} */
  const emphasis = {type: 'emphasis', children: []}
  /** @type {InlineCode} */
  const inlineCode = {type: 'inlineCode', value: 'a'}

  await t.test('should fail without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween()
    }, /Expected parent node/)
  })

  await t.test('should fail without parent node', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(inlineCode)
    }, /Expected parent node/)
  })

  await t.test('should fail without starting index (#1)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(emphasis)
    }, /Expected child node or index for start/)
  })

  await t.test('should fail without starting index (#2)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(emphasis, -1)
    }, /Expected positive finite number as index for start/)
  })

  await t.test('should fail without starting index (#3)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(emphasis, inlineCode)
    }, /Expected child node or index for start/)
  })

  await t.test('should fail for invalid `test` (#1)', async function () {
    assert.throws(function () {
      findAllBetween(
        paragraph,
        0,
        6,
        // @ts-expect-error: check that an error is thrown at runtime.
        false
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test('should fail for invalid `test` (#2)', async function () {
    assert.throws(function () {
      findAllBetween(
        paragraph,
        0,
        6,
        // @ts-expect-error: check that an error is thrown at runtime.
        true
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test('should fail without ending index (#1)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(paragraph, 0)
    }, /Expected child node or index for end/)
  })

  await t.test('should fail without ending index (#2)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(paragraph, 0, -1)
    }, /Expected positive finite number as index for end/)
  })

  await t.test('should fail without ending index (#3)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllBetween(paragraph, 0, inlineCode)
    }, /Expected child node or index for end/)
  })

  await t.test('should return the between nodes when without `test` (#1)', async function () {
    assert.deepEqual(findAllBetween(paragraph, paragraph.children[0], paragraph.children[2]), [
      paragraph.children[1]
    ])
  })

  await t.test('should return the between nodes when without `test` (#2)', async function () {
    assert.deepEqual(findAllBetween(paragraph, 0, 2), [paragraph.children[1]])
  })

  await t.test('should return the between nodes when without `test` (#3)', async function () {
    assert.deepEqual(findAllBetween(paragraph, 0, 1), [])
  })

  await t.test(
    'should return `[node]` when given a `node` and existing (#1)',
    async function () {
      const head = paragraph.children[0]
      assert.ok(head.type === 'text')
      assert.deepEqual(findAllBetween(paragraph, 0, 100, head, {behaviour: 'include'}), [head])
    }
  )

  await t.test(
    'should return `[node]` when given a `node` and existing (#2)',
    async function () {
      const head = paragraph.children[0]
      assert.ok(head.type === 'text')
      assert.deepEqual(
        findAllBetween(paragraph, paragraph.children[0], paragraph.children[6], head),
        []
      )
    }
  )

  await t.test(
    'should return `[node]` when given a `node` and existing (#3)',
    async function () {
      const head = paragraph.children[0]
      assert.ok(head.type === 'text')
      assert.deepEqual(
        findAllBetween(paragraph, head, head, undefined, {
          behaviour: 'include'
        }),
        [head]
      )
    }
  )

  await t.test(
    'should return `[node]` when given a `node` and existing (#4)',
    async function () {
      const head = paragraph.children[0]
      assert.ok(head.type === 'text')
      assert.deepEqual(findAllBetween(paragraph, head, head), [])
    }
  )

  await t.test(
    'should return `[node]` when given a `node` and existing (#5)',
    async function () {
      const head = paragraph.children[0]
      assert.ok(head.type === 'text')
      assert.deepEqual(findAllBetween(paragraph, 0, head), [])
    }
  )

  await t.test(
    'should return `[node]` when given a `node` and existing (#6)',
    async function () {
      const child = paragraph.children[1]
      assert.ok(child.type === 'emphasis')
      assert.deepEqual(findAllBetween(paragraph, 1, child), [])
    }
  )

  await t.test(
    'should return children when given a `type` and existing (#1)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, 100, 'strong'), [paragraph.children[3]])
    }
  )

  await t.test(
    'should return children when given a `type` and existing (#2)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, 3, 'strong'), [])
    }
  )

  await t.test(
    'should return children when given a `type` and existing (#3)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, paragraph.children[4], 'strong'), [
        paragraph.children[3]
      ])
    }
  )

  await t.test(
    'should return children when given a `type` and existing (#4)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, paragraph.children[3], 'strong'), [])
    }
  )

  await t.test(
    'should return children when given a `test` and existing (#1)',
    async function () {
      const result = paragraph.children.slice(4)

      assert.deepEqual(findAllBetween(paragraph, 0, 100, check), result)
    }
  )

  await t.test(
    'should return children when given a `test` and existing (#2)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, 3, check), [])
    }
  )

  await t.test(
    'should return children when given a `test` and existing (#3)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, paragraph.children[4], check), [])
    }
  )

  await t.test(
    'should return children when given a `test` and existing (#4)',
    async function () {
      assert.deepEqual(findAllBetween(paragraph, 0, paragraph.children[3], check), [])
    }
  )
})

/**
 * @param {unknown} _
 * @param {number | null | undefined} n
 */
function check(_, n) {
  return typeof n === 'number' && n > 3
}
