**A robust Next.js newsletter `Next.js Weekly` is sponsoring me** 💖
[![NextjsWeekly banner](./assets/next-js-weekly.png)](https://nextjsweekly.com/)

### [Become a sponsor](https://github.com/sponsors/ipikuka) 🚀

If you find **`unist-util-find-between-all`** useful in your projects, consider supporting my work.  
Your sponsorship means a lot 💖

My sponsors are going to be featured here and on [my sponsor wall](https://github.com/sponsors/ipikuka).

A warm thanks 🙌 to [@ErfanEbrahimnia](https://github.com/ErfanEbrahimnia), [@recepkyk](https://github.com/recepkyk), and [@LSeaburg](https://github.com/LSeaburg) for the support!

Thank you for supporting open source! 🙌

# unist-util-find-between-all

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]
[![Size][size-badge]][size]

[unist][] utility to find the nodes between two nodes.

## Contents

- [unist-util-find-between-all](#unist-util-find-between-all)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [When should I use this?](#when-should-i-use-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`findAllBetween(parent, child|index, child|index[, test][, options])`](#findallbetweenparent-childindex-childindex-test-options)
          - [Parameters](#parameters)
          - [Returns](#returns)
  - [Types](#types)
  - [Compatibility](#compatibility)
  - [Related](#related)
  - [Contribute](#contribute)
  - [License](#license)

## What is this?

This is a tiny utility that you can use to find nodes between two nodes or
indexes in a parent.

## When should I use this?

This is super tiny.
You can of course do it yourself.
But this helps when integrating with the rest of unified and unist.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install unist-util-find-between-all
```

In Deno with [`esm.sh`][esmsh]:

```js
import {findAllBetween} from 'https://esm.sh/unist-util-find-between-all@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {findAllBetween} from 'https://esm.sh/unist-util-find-between-all@1?bundle'
</script>
```

## Use

```js
import {u} from 'unist-builder'
import {findAllBetween} from 'unist-util-find-between-all'

const tree = u('tree', [
  u('leaf', 'leaf 1'),
  u('parent', [u('leaf', 'leaf 2'), u('leaf', 'leaf 3')]),
  u('leaf', 'leaf 4'),
  u('parent', [u('leaf', 'leaf 5')]),
  u('leaf', 'leaf 6'),
  u('empty'),
  u('leaf', 'leaf 7')
])

console.log(findAllBetween(tree, 1, 5, 'leaf'))
```

Yields:

```js
[
  {type: 'leaf', value: 'leaf 4'},
  {type: 'leaf', value: 'leaf 6'},
]
```

## API

This package exports the identifier [`findAllBetween`][api-find-all-between].
There is no default export.

### `findAllBetween(parent, child|index, child|index[, test][, options])`

Find the nodes in `parent` between two `child`s or indexes, that pass `test`.

###### Parameters

*   `parent` ([`Node`][node])
    — parent node
*   `index` (`number`)
    — index of child in `parent`
*   `child` ([`Node`][node])
    — child in `parent`
*   `test` ([`Test`][test])
    — `unist-util-is`-compatible test
*   `options` ([`{behaviour: "include" | "exclude"}`][options])
    — The behaviour for including or excluding (default) both sides (optional).

###### Returns

Children of `parent` ([`Array<Node>`][node]).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types (types for the test are in `unist-util-is`).

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.
As of now, that is Node.js 16+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Related

*   [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit)
    — walk the tree
*   [`unist-util-visit-parents`](https://github.com/syntax-tree/unist-util-visit-parents)
    — walk the tree with a stack of parents
*   [`unist-util-filter`](https://github.com/syntax-tree/unist-util-filter)
    — create a new tree with all nodes that pass a test
*   [`unist-util-map`](https://github.com/syntax-tree/unist-util-map)
    — create a new tree with all nodes mapped by a given function
*   [`unist-util-flatmap`](https://gitlab.com/staltz/unist-util-flatmap)
    — create a new tree by mapping (to an array) with the given function
*   [`unist-util-find-after`](https://github.com/syntax-tree/unist-util-find-after)
    — find a node after another node
*   [`unist-util-find-before`](https://github.com/syntax-tree/unist-util-find-before)
    — find a node before another node
*   [`unist-util-find-all-after`](https://github.com/syntax-tree/unist-util-find-all-after)
    — find all nodes after another node
*   [`unist-util-find-all-before`](https://github.com/syntax-tree/unist-util-find-all-before)
    — find all nodes before another node
*   [`unist-util-remove`](https://github.com/syntax-tree/unist-util-remove)
    — remove nodes from a tree that pass a test
*   [`unist-util-select`](https://github.com/syntax-tree/unist-util-select)
    — select nodes with CSS-like selectors

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Talat Kuyuk][author]

<!-- Definitions -->

[build-badge]: https://github.com/ipikuka/unist-util-find-between-all/workflows/main/badge.svg

[build]: https://github.com/ipikuka/unist-util-find-between-all/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/ipikuka/unist-util-find-between-all.svg

[coverage]: https://codecov.io/github/ipikuka/unist-util-find-between-all

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-find-between-all.svg

[downloads]: https://www.npmjs.com/package/unist-util-find-between-all

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=unist-util-find-between-all

[size]: https://bundlejs.com/?q=unist-util-find-between-all

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://www.npmjs.com/~talatkuyuk

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[test]: https://github.com/syntax-tree/unist-util-is#test

[api-find-all-between]: #findallbetweenparent-childindex-test
