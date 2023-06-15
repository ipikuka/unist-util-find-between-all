/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 */

import {convert} from 'unist-util-is'

/**
 * Find nodes in `parent` after a `child` or after an index, that pass `test`.
 *
 * @param parent
 *   Parent node.
 * @param index
 *   Child of `parent` or it’s index.
 * @param test
 *   `unist-util-is`-compatible test.
 * @returns
 *   Children of `parent` that pass `test`.
 */
export const findAllBetween =
  /**
   * @type {(
   *  (<T extends Node>(node: Parent, indexStart: Node | number, indexEnd: Node | number, test: import('unist-util-is').PredicateTest<T>) => Array<T>) &
   *  ((node: Parent, indexStart: Node | number, indexEnd: Node | number, test?: Test) => Array<Node>)
   * )}
   */
  (
    /**
     * @param {Parent} parent
     * @param {Node | number} indexStart
     * @param {Node | number} indexEnd
     * @param {Test} [test]
     * @returns {Array<Node>}
     */
    function (parent, indexStart, indexEnd, test) {
      const is = convert(test)
      /** @type {Array<Node>} */
      const results = []

      if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node')
      }

      if (typeof indexStart === 'number') {
        if (indexStart < 0 || indexStart === Number.POSITIVE_INFINITY) {
          throw new Error('Expected positive finite number as index for start')
        }
      } else {
        indexStart = parent.children.indexOf(indexStart)

        if (indexStart < 0) {
          throw new Error('Expected child node or index for start')
        }
      }

      if (typeof indexEnd === 'number') {
        if (indexEnd < 0 || indexEnd === Number.POSITIVE_INFINITY) {
          throw new Error('Expected positive finite number as index for end')
        }
      } else {
        indexEnd = parent.children.indexOf(indexEnd)

        if (indexEnd < 0) {
          throw new Error('Expected child node or index for end')
        }
      }

      while (++indexStart < indexEnd) {
        if (is(parent.children[indexStart], indexStart, parent)) {
          results.push(parent.children[indexStart])
        }
      }

      return results
    }
  )
