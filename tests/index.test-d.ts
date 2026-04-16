import { expectType } from "tsd";
import type {
  Heading,
  Paragraph,
  PhrasingContent,
  Root,
  RootContent,
  RowContent,
  TableCell,
  TableRow,
  Text,
} from "mdast";

import { findBetween } from "../src/index.js";

const text: Text = { type: "text", value: "alpha" };
const paragraph: Paragraph = { type: "paragraph", children: [text] };
const paragraph2: Paragraph = { type: "paragraph", children: [text] };
const heading: Heading = { type: "heading", depth: 1, children: [text] };
const heading2: Heading = { type: "heading", depth: 1, children: [text] };
const root: Root = { type: "root", children: [heading, paragraph, heading2, paragraph2] };
const cell: TableCell = { type: "tableCell", children: [text] };
const row: TableRow = { type: "tableRow", children: [cell] };

// @ts-expect-error: parent needed.
findBetween();

// @ts-expect-error: child or index needed.
findBetween(heading);

findBetween(
  // @ts-expect-error: parent needed.
  text,
  0,
  1,
);

expectType<PhrasingContent[]>(findBetween(heading, text, text));

expectType<Text[]>(findBetween(heading, text, text, "text"));

expectType<Text[]>(findBetween(heading, 0, text, "text"));

expectType<RootContent[]>(findBetween(root, text, 0));

expectType<RootContent[]>(findBetween(root, 0, paragraph2, { type: "heading" }));

expectType<Heading[]>(findBetween(root, 0, paragraph2, "heading"));

expectType<RootContent[]>(findBetween(root, 0, paragraph2, "heading"));

expectType<RowContent[]>(findBetween(row, 0, cell));
