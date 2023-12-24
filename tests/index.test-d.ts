import {expectType} from 'tsd'
import type {
  Heading,
  PhrasingContent,
  Root,
  RootContent,
  RowContent,
  TableCell,
  TableRow,
  Text
} from 'mdast'
import {findAllBetween} from '../src/index.js'

const text: Text = {type: 'text', value: 'alpha'}
const heading: Heading = {type: 'heading', depth: 1, children: [text]}
const root: Root = {type: 'root', children: [heading]}
const cell: TableCell = {type: 'tableCell', children: [text]}
const row: TableRow = {type: 'tableRow', children: [cell]}

// @ts-expect-error: parent needed.
findAllBetween()

// @ts-expect-error: child or index needed.
findAllBetween(heading)

findAllBetween(
  // @ts-expect-error: parent needed.
  text,
  0,
  1
)

expectType<PhrasingContent[]>(findAllBetween(heading, text, text))

expectType<Text[]>(findAllBetween(heading, text, text, 'text'))

expectType<Text[]>(findAllBetween(heading, 0, text, 'text'))

expectType<RootContent[]>(findAllBetween(root, text, 0))

expectType<Text[]>(findAllBetween(root, 0, text, 'text'))

expectType<RowContent[]>(findAllBetween(row, 0, cell))
