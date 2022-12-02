import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts";
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

function parse(input: string) {
  return input.trimEnd().split("\n\n").map((value) => value.split("\n").map(Number).reduce((a, b) => a+b)).flat().sort((a,b) => b-a);
}

function part1(input: string): number {
  const items = parse(input);
  return R.head(items)
}

function part2(input: string): number {
  const items = parse(input);
  throw new Error("TODO");
}

if (import.meta.main) {
  runPart(2022, 1, 1, part1);
  // runPart(2022, 1, 2, part2);
}

const TEST_INPUT = `\
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 24000);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 12);
});
