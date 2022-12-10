import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts"
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts"
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts"

function parse(input: string) {
  return input.trimEnd()
}

function part1(input: string): number {
  // How many characters need to be processed before the first start-of-packet marker is detected?
  const items = parse(input)

  const startOfPacketMarkerNumber = 4
  const equalsStartOfPacket = (acc: string, value: string) => {
    if (acc.length >= startOfPacketMarkerNumber) {
      const unique = R.countBy(R.toLower)(
        R.slice(-startOfPacketMarkerNumber, Infinity, [...acc]),
      )
      return R.keys(unique).length < startOfPacketMarkerNumber
    }
    return true
  }

  const processBuffer = (acc: string, value: string) => R.concat(acc, value)

  return R.reduceWhile(equalsStartOfPacket, processBuffer, "", [...items])
    .length
}

function part2(input: string): number {
  const items = parse(input)
  throw new Error("TODO")
}

if (import.meta.main) {
  runPart(2022, 6, 1, part1)
  // runPart(2022, 6, 2, part2);
}

const TEST_INPUT_0 = `\
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`
const TEST_INPUT = `\
bvwbjplbgvbhsrlpgdmjqwftvncz
`
const TEST_INPUT_2 = `\
nppdvjthqldpwncqszvftbrmjlhg
`
const TEST_INPUT_3 = `\
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
`
const TEST_INPUT_4 = `\
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT_0), 7)
  assertEquals(part1(TEST_INPUT), 5)
  assertEquals(part1(TEST_INPUT_2), 6)
  assertEquals(part1(TEST_INPUT_3), 10)
  assertEquals(part1(TEST_INPUT_4), 11)
})

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 5)
//   assertEquals(part2(TEST_INPUT_2), 6)
//   assertEquals(part2(TEST_INPUT_3), 10)
//   assertEquals(part2(TEST_INPUT_4), 11)
// })
