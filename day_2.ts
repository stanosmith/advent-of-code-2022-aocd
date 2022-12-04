import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { runPart } from "https://deno.land/x/aocd@v1.1.0/mod.ts";

interface IShape {
  shape: string;
  points: number;
  letters: string[];
}

const rock: IShape = {
  shape: "rock",
  points: 1,
  letters: ["A", "X"],
};
const paper: IShape = {
  shape: "paper",
  points: 2,
  letters: ["B", "Y"],
};
const scissors: IShape = {
  shape: "scissors",
  points: 3,
  letters: ["C", "Z"],
};

interface IPointMapping {
  [key:string]: IShape
}
const rpsPointMapping:IPointMapping = {
  A: rock,
  X: rock,
  B: paper,
  Y: paper,
  C: scissors,
  Z: scissors,
};

const win = calcTotalScore(6);
const lose = calcTotalScore(0);
const draw = calcTotalScore(3);

function parse(input: string) {
  return input
    .trimEnd()
    .split("\n")
    .map((game) => game.split(" ").map((gamePart) => gamePart.trimEnd()));
}

function part1(input: string): number {
  const items = parse(input);
  return items
    .map((game) => {
      const player1 = rpsPointMapping[game[0]];
      const player2 = rpsPointMapping[game[1]];

      return getGamePoints(player1, player2);
    })
    .reduce((totalPoints, points) => totalPoints + points);
}

function part2(input: string): number {
  const items = parse(input);
  throw new Error("TODO");
}

if (import.meta.main) {
  runPart(2022, 2, 1, part1);
  // runPart(2022, 2, 2, part2);
}

function getGamePoints(player1: IShape, player2: IShape) {
  if (player1.shape === player2.shape) {
    return draw(player2.points);
  }

  if (
    (player2.shape === rock.shape && player1.shape === scissors.shape) ||
    (player2.shape === paper.shape && player1.shape === rock.shape) ||
    (player2.shape === scissors.shape && player1.shape === paper.shape)
  ) {
    // 1 > 3: Rock defeats Scissors
    // 2 > 1: Paper defeats Rock
    // 3 > 2: Scissors defeats Paper
    return win(player2.points);
  } else {
    return lose(player2.points);
  }
}

function calcTotalScore(resultPoints: number) {
  return function winLoseDraw(rpsPoints: number) {
    return rpsPoints + resultPoints;
  };
}

const TEST_INPUT = `\
A Y
B X
C Z
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 15);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
