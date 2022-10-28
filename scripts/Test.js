import NQueensProblem from "./NQueensProblem.js";
import Cell from "./Cell.js";
import Winner from "./Winner.js";

function exception(f) {
    try {
        f();
        console.assert(false);
    } catch (ex) {
    }
}

function test1() {
    let game = new NQueensProblem(8);
    console.assert(game.addQueen(new Cell(0, 3)) === Winner.NONE);
    exception(() => game.addQueen(new Cell(0, 1)));
    console.assert(game.addQueen(new Cell(1, 6)) === Winner.NONE);
    exception(() => game.addQueen());
    console.assert(game.addQueen(new Cell(2, 2)) === Winner.NONE);
    exception(() => game.addQueen(new Cell(8, 7)));
    console.assert(game.addQueen(new Cell(3, 7)) === Winner.NONE);
    exception(() => game.addQueen(new Cell(0, 3)));
    console.assert(game.addQueen(new Cell(4, 1)) === Winner.NONE);
    console.assert(game.addQueen(new Cell(5, 4)) === Winner.NONE);
    console.assert(game.addQueen(new Cell(6, 0)) === Winner.NONE);
    console.assert(game.addQueen(new Cell(7, 5)) === Winner.WIN);
    console.log(game.solve());
    console.table(game.getBoard());
}

function test2() {
    let game = new NQueensProblem(8);
    console.assert(game.addQueen(new Cell(0, 3)) === Winner.NONE);
    exception(() => game.addQueen(new Cell(0, 1)));
    console.assert(game.addQueen(new Cell(1, 6)) === Winner.NONE);
    exception(() => game.addQueen());
    console.assert(game.addQueen(new Cell(2, 0)) === Winner.NONE);
    exception(() => game.addQueen(new Cell(8, 7)));
    console.assert(game.addQueen(new Cell(3, 7)) === Winner.NONE);
    exception(() => game.addQueen(new Cell(0, 3)));
    console.assert(game.addQueen(new Cell(4, 4)) === Winner.NONE);
    console.assert(game.addQueen(new Cell(5, 1)) === Winner.NONE);
    console.assert(game.addQueen(new Cell(6, 5)) === Winner.NONE);
    console.assert(game.addQueen(new Cell(7, 2)) === Winner.WIN);
    console.log(game.solve());
    console.table(game.getBoard());
}

test2();