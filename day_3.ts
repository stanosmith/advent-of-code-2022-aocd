import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts"
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts"
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts"

const alphaBET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allItemTypes = R.split("", alphaBET)

function parse(input: string) {
  return input.trimEnd().split("\n")
}

function part1(input: string): number {
  const items = parse(input)
  const getPriorityLevel = (letter: string) =>
    R.indexOf(letter, allItemTypes) + 1
  const matchedItemTypes = R.flatten(
    R.map((rucksack: string) => {
      const rucksackCompartments = R.splitAt(rucksack.length / 2, rucksack)
      const splitCompartments = (compartment: string) =>
        R.split("", compartment)
      const compartmentsSplit = R.map(splitCompartments, rucksackCompartments)
      return R.intersection(...compartmentsSplit)
    }, items),
  )
  const priorityLevels = R.map(getPriorityLevel, matchedItemTypes)
  return R.reduce(R.add, 0, priorityLevels)
}

function part2(input: string): number {
  const items = parse(input)
  throw new Error("TODO")
}

if (import.meta.main) {
  runPart(2022, 3, 1, part1)
  // runPart(2022, 3, 2, part2);
}

const TEST_INPUT = `\
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 157)
})

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
