import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts"
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts"

interface IShape {
  shape: string
  points: number
  letters: string[]
}

const rock: IShape = {
  shape: "rock",
  points: 1,
  letters: ["A", "X"],
}
const paper: IShape = {
  shape: "paper",
  points: 2,
  letters: ["B", "Y"],
}
const scissors: IShape = {
  shape: "scissors",
  points: 3,
  letters: ["C", "Z"],
}

const shouldLose = "X"
const shouldDraw = "Y"
const shouldWin = "Z"

interface IPointMapping {
  [key: string]: IShape
}
const rpsPointMapping: IPointMapping = {
  A: rock,
  [shouldLose]: rock,
  B: paper,
  [shouldDraw]: paper,
  C: scissors,
  [shouldWin]: scissors,
}

const calcWin = calcTotalScore(6)
const calcLose = calcTotalScore(0)
const calcDraw = calcTotalScore(3)

function parse(input: string) {
  return input
    .trimEnd()
    .split("\n")
    .map((game) => game.split(" ").map((gamePart) => gamePart.trimEnd()))
}

function part1(input: string): number {
  const items = parse(input)
  return items
    .map((game) => {
      const player1 = rpsPointMapping[game[0]]
      const player2 = rpsPointMapping[game[1]]

      return getGamePoints(player1, player2)
    })
    .reduce((totalPoints, points) => totalPoints + points)
}

function part2(input: string) {
  const items = parse(input)
  return items
    .map((game) => {
      const player1 = rpsPointMapping[game[0]]
      const player2 = game[1]

      return getGamePointsPartTwo(player1, player2)
    })
    .reduce((totalPoints, points) => totalPoints + points)
}

if (import.meta.main) {
  runPart(2022, 2, 1, part1)
  runPart(2022, 2, 2, part2)
}

function getGamePoints(player1: IShape, player2: IShape) {
  if (player1.shape === player2.shape) {
    return calcDraw(player2.points)
  }

  if (
    (player2.shape === rock.shape && player1.shape === scissors.shape) ||
    (player2.shape === paper.shape && player1.shape === rock.shape) ||
    (player2.shape === scissors.shape && player1.shape === paper.shape)
  ) {
    // 1 > 3: Rock defeats Scissors
    // 2 > 1: Paper defeats Rock
    // 3 > 2: Scissors defeats Paper
    return calcWin(player2.points)
  } else {
    return calcLose(player2.points)
  }
}

function getGamePointsPartTwo(player1: IShape, player2Strategy: string) {
  if (player2Strategy === shouldDraw) {
    return calcDraw(player1.points)
  }

  // 1 > 3: Rock defeats Scissors
  // 2 > 1: Paper defeats Rock
  // 3 > 2: Scissors defeats Paper
  if (player2Strategy === shouldWin) {
    let winningShape
    switch (player1.shape) {
      case scissors.shape:
        winningShape = rock
        break
      case rock.shape:
        winningShape = paper
        break
      case paper.shape:
        winningShape = scissors
        break
      default:
        throw `Invalid shape "${player1.shape}"`
    }
    return calcWin(winningShape.points)
  } else {
    let losingShape
    switch (player1.shape) {
      case scissors.shape:
        losingShape = paper
        break
      case rock.shape:
        losingShape = scissors
        break
      case paper.shape:
        losingShape = rock
        break
      default:
        throw `Invalid shape "${player1.shape}"`
    }
    return calcLose(losingShape.points)
  }
}

function calcTotalScore(resultPoints: number) {
  return function winLoseDraw(rpsPoints: number) {
    return rpsPoints + resultPoints
  }
}

const TEST_INPUT = `\
A Y
B X
C Z
`

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 15)
})

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 12)
})
