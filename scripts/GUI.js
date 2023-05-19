import NQueensProblem from "./NQueensProblem.js";
import Cell from "./Cell.js";
import CellState from "./CellState.js";

class GUI {
    constructor() {
        this.game = null;
    }
    registerEvents() {
        let form = document.forms[0];
        form.size.onchange = this.resetBoard.bind(this);
        form.reset.onclick = this.resetBoard.bind(this);
        form.solve.onclick = this.solveProblem.bind(this);
        this.resetBoard();
    }
    resetBoard() {
        let form = document.forms[0];
        let size = form.size.valueAsNumber;
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < size; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                let td = document.createElement("td");
                td.className = CellState.EMPTY;
                td.onclick = this.addQueen.bind(this);
                td.oncontextmenu = this.removeQueen.bind(this);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.game = new NQueensProblem(size);
        this.changeMessage();
    }
    solveProblem() {
        let cells = this.game.solve();
        if (cells.length === 0) {
            this.setMessage("No solutions were found!");
        } else {
            this.updateBoard();
        }
    }
    changeMessage(m) {
        let objs = { WIN: "You win!", LOSE: "You lose!" };
        if (objs[m]) {
            this.setMessage(`Game Over! ${objs[m]}`);
        } else {
            this.setMessage("");
        }
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
    }
    addQueen(evt) {
        let td = evt.currentTarget;
        try {
            let w = this.game.addQueen(this.coordinates(td));
            this.changeMessage(w);
            this.updateBoard();
        } catch (ex) {
            this.setMessage(ex.message);
        }
    }
    removeQueen(evt) {
        evt.preventDefault();
        let td = evt.currentTarget;
        try {
            this.game.removeQueen(this.coordinates(td));
            this.changeMessage();
            this.updateBoard();
        } catch (ex) {
            this.setMessage(ex.message);
        }
    }
    updateBoard() {
        let board = this.game.getBoard();
        let form = document.forms[0];
        let size = parseInt(form.size.value);
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < size; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                let td = document.createElement("td");
                td.onclick = this.addQueen.bind(this);
                td.oncontextmenu = this.removeQueen.bind(this);
                tr.appendChild(td);
                td.className = board[i][j];
                if (board[i][j] === CellState.QUEEN) {
                    let img = document.createElement("img");
                    img.src = "Black-Queen.svg";
                    td.appendChild(img);
                }
            }
            tbody.appendChild(tr);
        }
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
}
let gui = new GUI();
gui.registerEvents();