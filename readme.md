**A robust Next.js newsletter `Next.js Weekly` is sponsoring me** 💖
[![NextjsWeekly banner](./assets/next-js-weekly.png)](https://nextjsweekly.com/)

### [Become a sponsor](https://github.com/sponsors/ipikuka) 🚀

If you find **`unist-util-find-between`** useful in your projects, consider supporting my work.  
Your sponsorship means a lot 💖

My sponsors are going to be featured here and on [my sponsor wall](https://github.com/sponsors/ipikuka).

A warm thanks 🙌 to [@ErfanEbrahimnia](https://github.com/ErfanEbrahimnia), [@recepkyk](https://github.com/recepkyk), and [@LSeaburg](https://github.com/LSeaburg) for the support!

Thank you for supporting open source! 🙌

# unist-util-find-between

[![npm version][badge-npm-version]][url-npm-package]
[![npm downloads][badge-npm-download]][url-npm-package]
[![publish to npm][badge-publish-to-npm]][url-publish-github-actions]
[![code-coverage][badge-codecov]][url-codecov]
[![type-coverage][badge-type-coverage]][url-github-package]
[![typescript][badge-typescript]][url-typescript]
[![license][badge-license]][url-license]

**`unist-util-find-between`** is a [unist][unist] utility to find nodes between two nodes or indexes in a parent.

## When should I use this?

You may need to use **`unist-util-find-between`** when you develop a unified plugin or unist utility while inspecting or traversing an abstract syntax tree (AST).

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install unist-util-find-between
```

In Deno with [`esm.sh`][esmsh]:

```js
import {findBetween} from 'https://esm.sh/unist-util-find-between@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {findBetween} from 'https://esm.sh/unist-util-find-between@1?bundle'
</script>
```

## Use

```js
import {u} from 'unist-builder'
import {findBetween, findBetweenIncluded} from 'unist-util-find-between'

const tree = u('tree', [
  u('leaf', 'leaf 1'),
  u('parent', [u('leaf', 'leaf 2'), u('leaf', 'leaf 3')]),
  u('leaf', 'leaf 4'),
  u('parent', [u('leaf', 'leaf 5')]),
  u('leaf', 'leaf 6'),
  u('empty'),
  u('leaf', 'leaf 7')
])

console.log(findBetween(tree, 1, 4, 'leaf'))
```

Yields:

```js
[
  {type: 'leaf', value: 'leaf 4'},
]
```

```js
console.log(findBetweenIncluded(tree, 1, 4, 'leaf'))
```

Yields:

```js
[
  {type: 'leaf', value: 'leaf 4'},
  {type: 'leaf', value: 'leaf 6'},
]
```

## API

This package exports the identifiers [**`findBetween`**][api-findBetween] and [**`findBetweenIncluded`**][api-findBetweenIncluded]. There is no default export.

### `findBetween`

**`findBetween(parent, child|index, child|index[, test])`**

Finds nodes in a `parent` between two `child`s or indexes, that pass `test`.

Starting and ending nodes or indexes are **excluded**. Use `findBetweenIncluded` for including starting and ending nodes or indexes.

### `findBetweenIncluded`

**`findBetweenIncluded(parent, child|index, child|index[, test])`**

Finds nodes in a `parent` between two `child`s or indexes, that pass `test`.

Starting and ending nodes or indexes are **included**. Use `findBetween` for excluding starting and ending nodes or indexes.

###### Parameters

*   `parent` ([`Node`][node])
    — parent node
*   `index` (`number`)
    — index of child in `parent`
*   `child` ([`Node`][node])
    — child in `parent`
*   `test` ([`Test`][test])
    — `unist-util-is`-compatible test

###### Returns

Children of `parent` ([`Array<Node>`][node]).

## Types

This package is fully typed with [TypeScript][url-typescript].
It exports no additional types (types for the test are in `unist-util-is`).

## Compatibility

This plugin works with unified version 6+ and Node.js 16+.

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

## My Plugins

I like to contribute the Unified / Remark / MDX ecosystem, so I recommend you to have a look my plugins.

### My Remark Plugins

- [`remark-flexible-code-titles`](https://www.npmjs.com/package/remark-flexible-code-titles)
  – Remark plugin to add titles or/and containers for the code blocks with customizable properties
- [`remark-flexible-containers`](https://www.npmjs.com/package/remark-flexible-containers)
  – Remark plugin to add custom containers with customizable properties in markdown
- [`remark-ins`](https://www.npmjs.com/package/remark-ins)
  – Remark plugin to add `ins` element in markdown
- [`remark-flexible-paragraphs`](https://www.npmjs.com/package/remark-flexible-paragraphs)
  – Remark plugin to add custom paragraphs with customizable properties in markdown
- [`remark-flexible-markers`](https://www.npmjs.com/package/remark-flexible-markers)
  – Remark plugin to add custom `mark` element with customizable properties in markdown
- [`remark-flexible-toc`](https://www.npmjs.com/package/remark-flexible-toc)
  – Remark plugin to expose the table of contents via `vfile.data` or via an option reference
- [`remark-mdx-remove-esm`](https://www.npmjs.com/package/remark-mdx-remove-esm)
  – Remark plugin to remove import and/or export statements (mdxjsEsm)
- [`remark-mdx-remove-expressions`](https://www.npmjs.com/package/remark-mdx-remove-expressions)
  – Remark plugin to remove MDX expressions within curlybraces {} in MDX content

### My Rehype Plugins

- [`rehype-pre-language`](https://www.npmjs.com/package/rehype-pre-language)
  – Rehype plugin to add language information as a property to `pre` element
- [`rehype-highlight-code-lines`](https://www.npmjs.com/package/rehype-highlight-code-lines)
  – Rehype plugin to add line numbers to code blocks and allow highlighting of desired code lines
- [`rehype-code-meta`](https://www.npmjs.com/package/rehype-code-meta)
  – Rehype plugin to copy `code.data.meta` to `code.properties.metastring`
- [`rehype-image-toolkit`](https://www.npmjs.com/package/rehype-image-toolkit)
  – Rehype plugin to enhance Markdown image syntax `![]()` and Markdown/MDX media elements (`<img>`, `<audio>`, `<video>`) by auto-linking bracketed or parenthesized image URLs, wrapping them in `<figure>` with optional captions, unwrapping images/videos/audio from paragraph, parsing directives in title for styling and adding attributes, and dynamically converting images into `<video>` or `<audio>` elements based on file extension.

### My Recma Plugins

- [`recma-mdx-escape-missing-components`](https://www.npmjs.com/package/recma-mdx-escape-missing-components)
  – Recma plugin to set the default value `() => null` for the Components in MDX in case of missing or not provided so as not to throw an error
- [`recma-mdx-change-props`](https://www.npmjs.com/package/recma-mdx-change-props)
  – Recma plugin to change the `props` parameter into the `_props` in the `function _createMdxContent(props) {/* */}` in the compiled source in order to be able to use `{props.foo}` like expressions. It is useful for the `next-mdx-remote` or `next-mdx-remote-client` users in `nextjs` applications.
- [`recma-mdx-change-imports`](https://www.npmjs.com/package/recma-mdx-change-imports)
  – Recma plugin to convert import declarations for assets and media with relative links into variable declarations with string URLs, enabling direct asset URL resolution in compiled MDX.
- [`recma-mdx-import-media`](https://www.npmjs.com/package/recma-mdx-import-media)
  – Recma plugin to turn media relative paths into import declarations for both markdown and html syntax in MDX.
- [`recma-mdx-import-react`](https://www.npmjs.com/package/recma-mdx-import-react)
  – Recma plugin to ensure getting `React` instance from the arguments and to make the runtime props `{React, jsx, jsxs, jsxDev, Fragment}` is available in the dynamically imported components in the compiled source of MDX.
- [`recma-mdx-html-override`](https://www.npmjs.com/package/recma-mdx-html-override)
  – Recma plugin to allow selected raw HTML elements to be overridden via MDX components.
- [`recma-mdx-interpolate`](https://www.npmjs.com/package/recma-mdx-interpolate)
  – Recma plugin to enable interpolation of identifiers wrapped in curly braces within the `alt`, `src`, `href`, and `title` attributes of markdown link and image syntax in MDX.

### My Unist Utils and Unified Plugins

I also build low-level utilities and plugins for the Unified ecosystem that can be used across Remark, Rehype, Recma, and other unist-based abstract syntax trees (ASTs).

- [`unist-util-find-between`](https://www.npmjs.com/package/unist-util-find-between)
  – Unist utility to find the nodes between two nodes.
- [`unified-log-tree`](https://www.npmjs.com/package/unified-log-tree)
  – Unified plugin to log abstract syntax trees (ASTs) for debugging without mutating.

## License

[MIT License](./LICENSE) © ipikuka

<!-- Definitions -->

[npm]: https://docs.npmjs.com/cli/install
[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh
[unist]: https://github.com/syntax-tree/unist
[node]: https://github.com/syntax-tree/unist#node
[test]: https://github.com/syntax-tree/unist-util-is#test
[api-findBetween]: #findBetween
[api-findBetweenIncluded]: #findBetweenIncluded

[badge-npm-version]: https://img.shields.io/npm/v/unist-util-find-between
[badge-npm-download]:https://img.shields.io/npm/dt/unist-util-find-between
[url-npm-package]: https://www.npmjs.com/package/unist-util-find-between
[url-github-package]: https://github.com/ipikuka/unist-util-find-between

[badge-license]: https://img.shields.io/github/license/ipikuka/unist-util-find-between
[url-license]: https://github.com/ipikuka/unist-util-find-between/blob/main/LICENSE

[badge-publish-to-npm]: https://github.com/ipikuka/unist-util-find-between/actions/workflows/publish.yml/badge.svg
[url-publish-github-actions]: https://github.com/ipikuka/unist-util-find-between/actions/workflows/publish.yml

[badge-typescript]: https://img.shields.io/npm/types/unist-util-find-between
[url-typescript]: https://www.typescriptlang.org/

[badge-codecov]: https://codecov.io/gh/ipikuka/unist-util-find-between/graph/badge.svg?token=VC69ZAXWC0
[url-codecov]: https://codecov.io/gh/ipikuka/unist-util-find-between

[badge-type-coverage]: https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fipikuka%2Funist-util-find-between%2Fmaster%2Fpackage.json
