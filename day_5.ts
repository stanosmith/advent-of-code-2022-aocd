import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts"
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts"
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts"

interface Instruction {
  move: number
  from: number
  to: number
}

function parse(input: string) {
  const stacksAndMoves = input.trimEnd().split("\n\n")
  // const onlyUpper = (value) =>

  const notEmpty = (value: string) => R.not(R.isEmpty(value))

  const removeBrackets = (value: string) =>
    value.split("[").join("").split("]").join("")

  const stackBuilder = (value: string) => {
    const stackWithBrackets = R.map(R.trim, R.splitEvery(4, value))
    // return stackWithBrackets
    return R.map(removeBrackets, stackWithBrackets)
  }

  const getStacks = (value: string): Array<string[]> => {
    const splitBy = "\n 1"
    // const totalStacks = value
    //   .split(splitBy)
    //   .slice(1)
    //   .join(" ")
    //   .split("  ")
    //   .map(R.trim).length
    const crates = value.split(splitBy).slice(0, 1).join(" ").split("\n")
    const excludeEmpty = (stack: string[]) => R.filter(notEmpty, stack)

    return R.map(excludeEmpty, R.transpose(R.map(stackBuilder, crates)))
  }

  const getMoves = (value: string): Instruction[] => {
    const transformer = (moveRaw: string) => {
      return R.map(Number, R.fromPairs(R.splitEvery(2, moveRaw.split(" "))))
    }
    // const moveExample = {
    //   move: 1,
    //   from: 2,
    //   to: 1,
    // }
    return R.map(transformer, value.split("\n"))
  }

  return {
    stacks: getStacks(stacksAndMoves[0]),
    moves: getMoves(stacksAndMoves[1]),
  }
}

function part1(input: string): string {
  // After the rearrangement procedure completes, what crate ends up on top of each stack?
  const items = parse(input)
  const { stacks, moves } = items

  // Loop through the moves and make changes to the stacks
  const executeMoves = (
    rearrangedStacks: Array<string[]>,
    instruction: Instruction,
  ) => {
    const fromStackIndex = instruction.from - 1
    const toStackIndex = instruction.to - 1

    // Get the array of crates to move
    const cratesToMove = R.take(
      instruction.move,
      rearrangedStacks[fromStackIndex],
    )
    // Remove the crates from the target stack
    const stackMissingCrates = rearrangedStacks[fromStackIndex].slice(
      instruction.move,
    )
    // Concat the moved crates onto the target stack (in reverse order)
    const stackWithNewCrates = R.concat(
      R.reverse(cratesToMove),
      rearrangedStacks[instruction.to - 1],
    )

    let updatedStacks = [...rearrangedStacks]
    updatedStacks[fromStackIndex] = stackMissingCrates
    updatedStacks[toStackIndex] = stackWithNewCrates
    return updatedStacks
  }

  const getTopCrates = (topCrates: string, stack: string[]) => {
    return R.concat(topCrates, stack[0])
  }

  return R.reduce(getTopCrates, "", R.reduce(executeMoves, stacks, moves))
}

function part2(input: string): string {
  const items = parse(input)
  throw new Error("TODO")
}

if (import.meta.main) {
  runPart(2022, 5, 1, part1)
  // runPart(2022, 5, 2, part2);
}

const TEST_INPUT = `\
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), "CMZ")
})

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12)
// })
