import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts"
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts"
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts"

const alphaBET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allItemTypes = R.split("", alphaBET)

function parse(input: string) {
  return input.trimEnd().split("\n")
}

const getPriorityLevel = (letter: string) => R.indexOf(letter, allItemTypes) + 1
const splitCompartments = (compartment: string) => R.split("", compartment)
const getCompartments = (rucksack: string) =>
  R.splitAt(rucksack.length / 2, rucksack)
const processGroups = (rucksack: string) => {
  const compartmentsSplit = R.map(splitCompartments, getCompartments(rucksack))
  return R.intersection(...compartmentsSplit)
}
const processGroups2 = (group: string[]) => {
  const splitGroups = R.map(splitCompartments, group)
  return R.reduce(R.intersection, splitGroups[0], splitGroups)
}

function part1(input: string): number {
  const items = parse(input)
  const matchedItemTypes = R.flatten(R.map(processGroups, items))
  const priorityLevels = R.map(getPriorityLevel, matchedItemTypes)
  return R.reduce(R.add, 0, priorityLevels)
}

function part2(input: string): number {
  const items = parse(input)
  const groups = R.splitEvery(3, items)

  const matchedItemTypes = R.flatten(R.map(processGroups2, groups))
  const priorityLevels = R.map(getPriorityLevel, matchedItemTypes)
  return R.reduce(R.add, 0, priorityLevels)
}

if (import.meta.main) {
  runPart(2022, 3, 1, part1)
  runPart(2022, 3, 2, part2)
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

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 70)
})
