/*global LifeCell*/

(function(global) {
    'use strict';

    function LifeBoard(init) {
        if (init && init.width && init.height) {
            this.width = init.width;
            this.height = init.height;

            this._createCells();
        } else if (init && init.cells) {
            var rows = init.cells;
            this.height = rows.length;
            this.width = rows[0].length;

            this._createCells();
            this._initCells(rows);
        } else {
            return undefined;
        }

    }

    LifeBoard.prototype.getCell = function(x, y) {
        if (!(x < 0 || x >= this.width) && !(y < 0 || y >= this.height)) {
            return this.cells[y][x];
        }
    };

    LifeBoard.prototype._createCells = function() {
        var y, x;
        var height = this.height;
        var width = this.width;
        var rows = this.cells = [];

        for (y = 0; y < height; y++) {
            rows[y] = [];
            for (x = 0; x < width; x++) {
                rows[y][x] = new LifeCell();
            }
        }
    };

    LifeBoard.prototype._initCells = function(init) {
        var y, x;
        var width = this.width;
        var height = this.height;
        var rows = this.cells;

        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                if (x < init[y].length) {
                    rows[y][x].alive = !!(init[y][x]);
                }
            }
        }
    };

    LifeBoard.prototype.countLivingNeighbors = function(x, y) {
        var neighbor, sx, sy;
        var count = 0;

        for (sx = x - 1; sx <= x + 1; sx++) {
            for (sy = y - 1; sy <= y + 1; sy++) {
                if (!((sx === x) && (sy === y))) {
                    neighbor = this.getCell(sx, sy);
                    if (neighbor && neighbor.alive) {
                        count += 1;
                    }
                }
            }
        }

        return count;
    };

    LifeBoard.prototype.progress = function() {
        var x, y, neighbors;
        var newBoard = [];

        for (y = 0; y < this.height; y++) {
            newBoard[y] = [];
            for (x = 0; x < this.width; x++) {
                neighbors = this.countLivingNeighbors(x, y);
                if (neighbors < 2) {
                    newBoard[y][x] = false;
                } else if (neighbors > 3) {
                    newBoard[y][x] = false;
                } else if (neighbors === 3) {
                    newBoard[y][x] = true;
                } else {
                    newBoard[y][x] = this.getCell(x, y).alive;
                }
            }
        }

        this._initCells(newBoard);
    };

    global.LifeBoard = LifeBoard;
}(window));

