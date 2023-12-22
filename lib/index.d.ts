/**
 * Find the nodes in `parent` between two `node`s or two indexes, that
 * pass `test`. Nodes and indexes at both sides are excluded, but there is an
 * option for including both sides
 *
 * @param parent
 *   Parent node.
 * @param indexStart
 *   Child node or index in the start of between
 * @param indexEnd
 *   Child node or index in the end of between
 * @param [test=undefined]
 *   Test for child to look for (optional).
 * @param [options=undefined]
 *   The behaviour for including or excluding both sides (optional).
 * @returns
 *   Children (matching `test`, if given).
 */
export const findAllBetween: (<Kind extends import("unist").Parent, Check extends Test>(parent: Kind, indexStart: number | Child<Kind>, indexEnd: number | Child<Kind>, test: Check, options?: Behaviour) => Matches<Child<Kind>, Check>[]) & (<Kind_1 extends import("unist").Parent>(parent: Kind_1, indexStart: number | Child<Kind_1>, indexEnd: number | Child<Kind_1>, test?: null | undefined, options?: Behaviour) => Child<Kind_1>[]);
export type UnistNode = import('unist').Node;
export type UnistParent = import('unist').Parent;
/**
 * Test from `unist-util-is`.
 *
 * Note: we have remove and add `undefined`, because otherwise when generating
 * automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 * which doesn’t work when publishing on npm.
 */
export type Test = Exclude<import('unist-util-is').Test, undefined> | undefined;
/**
 * Get the value of a type guard `Fn`.
 */
export type Predicate<Fn, Fallback> = Fn extends (value: any) => value is infer Thing ? Thing : Fallback;
/**
 * Check whether a node matches a primitive check in the type system.
 */
export type MatchesOne<Value, Check> = (Check extends null | undefined ? Value : Value extends {
    type: Check;
} ? Value : Value extends Check ? Value : Check extends Function ? Predicate<Check, Value> extends Value ? Predicate<Check, Value> : never : never);
/**
 * Check whether a node matches a check in the type system.
 */
export type Matches<Value, Check> = (Check extends Array<any> ? MatchesOne<Value, Check[keyof Check]> : MatchesOne<Value, Check>);
/**
 * Collect nodes that can be parents of `Child`.
 */
export type Child<Kind extends import("unist").Node> = Kind extends {
    children: (infer Child_1)[];
} ? Child_1 : never;
/**
 * whether nodes and indexes ath both sides included or exculuded.
 * default behaviour is excluded one.
 */
export type Behaviour = ({
    behaviour: "include" | "exclude";
});
