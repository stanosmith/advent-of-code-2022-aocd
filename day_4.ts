import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts"
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts"
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts"

function parse(input: string) {
  const addOne = (value: number, index: number, values: number[]) => {
    if (index === values.length - 1) {
      return ++value
    }
    return value
  }
  const splitAssignments = (assignment: string) =>
    R.range(...assignment.split("-").map(Number).map(addOne))
  const splitAssignmentPairs = (group: string) =>
    R.map(splitAssignments, group.split(","))
  return R.map(splitAssignmentPairs, input.trimEnd().split("\n"))
}

function part1(input: string): number {
  // In how many assignment pairs does one range fully contain the other?
  const assignmentPairs = parse(input)

  console.log(assignmentPairs.length)

  return assignmentPairs
    .map((assignmentPair: number[]) => {
      const getLength = (range: number[]) => range.length
      const diff = (a: number, b: number) => a - b
      const ogLengths = R.sort(diff, R.map(getLength, assignmentPair))
      const intersection = R.intersection(...assignmentPair)

      return ogLengths[0] <= intersection.length ? 1 : 0
    })
    .reduce((sum: number, value: number) => sum + value, 0)
}

function part2(input: string): number {
  const assignmentPairs = parse(input)

  console.log(assignmentPairs.length)

  return assignmentPairs
    .map((assignmentPair: number[]) => {
      const intersection = R.intersection(...assignmentPair)
      return intersection.length > 0 ? 1 : 0
    })
    .reduce((sum: number, value: number) => sum + value, 0)
}

if (import.meta.main) {
  runPart(2022, 4, 1, part1)
  runPart(2022, 4, 2, part2)
}

const TEST_INPUT = `\
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 2)
})

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 4)
})
