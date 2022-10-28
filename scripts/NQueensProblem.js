import CellState from "./CellState.js";
import Cell from "./Cell.js";
import Winner from "./Winner.js";

export default class NQueensProblem {
    constructor(n) {
        this.size = n;
        this.board = Array(n).fill().map(() => Array(n).fill(CellState.EMPTY));    
    }
    getBoard() {
        return this.board;
    }
    addQueen(cell) {
        if (!cell) {
            throw new Error("Cell must be informed.");
        }
        if (!this.onBoard(cell)) {
            throw new Error("Cell must be on board.");
        }
        let { x, y } = cell;
        if (this.board[x][y] === CellState.QUEEN) {
            throw new Error("This cell already have a queen.");
        }
        if (this.board[x][y] === CellState.BLOCKED) {
            throw new Error("This cell is blocked.");
        }
        this.board[x][y] = CellState.QUEEN;
        this.updateBoard();
        return this.endOfGame();
    }
    removeQueen(cell) {
        if (!cell) {
            throw new Error("Cell must be informed.");
        }
        if (!this.onBoard(cell)) {
            throw new Error("Cell must be on board.");
        }
        let { x, y } = cell;
        if (this.board[x][y] !== CellState.QUEEN) {
            throw new Error("Cell must have a queen.");
        }
        this.board[x][y] = CellState.EMPTY;
        this.updateBoard();
    }
    updateBoard(matrix = this.board) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (matrix[i][j] === CellState.BLOCKED) {
                    matrix[i][j] = CellState.EMPTY;
                }
            }
        }
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (matrix[i][j] === CellState.QUEEN) {
                    let moves = this.possibleMoves(new Cell(i, j));
                    moves.forEach(({ x, y }) => {
                        if (matrix[x][y] === CellState.EMPTY) {
                            matrix[x][y] = CellState.BLOCKED;
                        }
                    });
                }
            }
        }
    }
    count(v, matrix = this.board) {
        return matrix.flat().filter(c => c === v).length;
    }
    endOfGame() {
        if (this.count(CellState.QUEEN) === this.size) {
            return Winner.WIN;
        }
        if (this.count(CellState.EMPTY) === 0) {
            return Winner.LOSE;
        }
        return Winner.NONE;
    }
    getPossibleMoves(matrix) {
        let poss = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (matrix[i][j] === CellState.EMPTY) {
                    poss.push(new Cell(i, j));
                }
            }
        }
        return poss;
    }
    inner(tempBoard, cells) {
        let moves = this.getPossibleMoves(tempBoard);
        if (moves.length === 0) {
            return (this.count(CellState.QUEEN, tempBoard) === this.size);
        } else {
            for (let m of moves) {
                cells.push(m);
                let { x, y } = m;
                tempBoard[x][y] = CellState.QUEEN;
                this.updateBoard(tempBoard);
                let ret = this.inner(tempBoard, cells);
                if (ret) {
                    return true;
                } else {
                    tempBoard[x][y] = CellState.EMPTY;
                    this.updateBoard(tempBoard);
                }
                cells.pop();
            }
            return false;
        }
    }
    solve() {
        let tempBoard = this.board.map(arr => arr.slice());
        let cells = [];
        this.inner(tempBoard, cells);
        for (let cell of cells) {
            this.addQueen(cell);
        }
        return cells;
    }
    possibleMoves(cell) {
        let dg = this.bishopPositions(cell);
        let hv = this.rookPositions(cell);
        return dg.concat(hv);
    }
    selectPositions(cell, directions) {
        let moves = [];
        let { x: row, y: col } = cell;
        let piece = this.board[row][col];
        for (let { x, y } of directions) {
            for (let k = row + x, l = col + y, c = new Cell(k, l); this.onBoard(c); k += x, l += y, c = new Cell(k, l)) {
                let { x: a, y: b } = c;
                let tempPiece = this.board[a][b];
                if (tempPiece === CellState.EMPTY || piece !== tempPiece) {
                    moves.push(c);
                }
            }
        }
        return moves;
    }
    rookPositions(cell) {
        let lin = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
        return this.selectPositions(cell, lin);
    }
    bishopPositions(cell) {
        let lin = [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }];
        return this.selectPositions(cell, lin);
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return (inLimit(x, this.size) && inLimit(y, this.size));
    }
}