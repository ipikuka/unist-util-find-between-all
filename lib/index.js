/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 */

/**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */

/**
 * @typedef {(
*   Fn extends (value: any) => value is infer Thing
*   ? Thing
*   : Fallback
* )} Predicate
*   Get the value of a type guard `Fn`.
* @template Fn
*   Value; typically function that is a type guard (such as `(x): x is Y`).
* @template Fallback
*   Value to yield if `Fn` is not a type guard.
*/

/**
* @typedef {(
*   Check extends null | undefined // No test.
*   ? Value
*   : Value extends {type: Check} // String (type) test.
*   ? Value
*   : Value extends Check // Partial test.
*   ? Value
*   : Check extends Function // Function test.
*   ? Predicate<Check, Value> extends Value
*     ? Predicate<Check, Value>
*     : never
*   : never // Some other test?
* )} MatchesOne
*   Check whether a node matches a primitive check in the type system.
* @template Value
*   Value; typically unist `Node`.
* @template Check
*   Value; typically `unist-util-is`-compatible test, but not arrays.
*/

/**
* @typedef {(
*   Check extends Array<any>
*   ? MatchesOne<Value, Check[keyof Check]>
*   : MatchesOne<Value, Check>
* )} Matches
*   Check whether a node matches a check in the type system.
* @template Value
*   Value; typically unist `Node`.
* @template Check
*   Value; typically `unist-util-is`-compatible test.
*/

/**
* @typedef {(
*   Kind extends {children: Array<infer Child>}
*   ? Child
*   : never
* )} Child
*   Collect nodes that can be parents of `Child`.
* @template {UnistNode} Kind
*   All node types.
*/

import {convert} from 'unist-util-is'

/**
 * Find the nodes in `parent` between two `node`s or between two indexes, that
 * pass `test`.
 *
 * @param parent
 *   Parent node.
 * @param indexStart
 *   Child node or index in the start of between
 * @param indexEnd
 *   Child node or index in the end of between
 * @param [test=undefined]
 *   Test for child to look for (optional).
 * @returns
 *   Children (matching `test`, if given).
 */
export const findAllBetween =
  // Note: overloads like this are needed to support optional generics.
  /**
   * @type {(
  *   (<Kind extends UnistParent, Check extends Test>(parent: Kind, indexStart: Child<Kind> | number, indexEnd: Child<Kind> | number, test: Check) => Array<Matches<Child<Kind>, Check>>) &
  *   (<Kind extends UnistParent>(parent: Kind, indexStart: Child<Kind> | number, indexEnd: Child<Kind> | number, test?: null | undefined) => Array<Child<Kind>>)
  * )}
  */
 (
    /**
     * @param {UnistParent} parent
     * @param {UnistNode | number} indexStart
     * @param {UnistNode | number} indexEnd
     * @param {Test} [test]
     * @returns {Array<UnistNode>}
     */
    function (parent, indexStart, indexEnd, test) {
      const is = convert(test)
      /** @type {Array<UnistNode>} */
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
