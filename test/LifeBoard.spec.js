/*global describe, xdescribe, it, expect, beforeEach, LifeCell, LifeBoard*/

describe('A LifeBoard', function() {
    'use strict';

    it('is initialized with a matrix (read 2-dimensional array) of cells in the given size', function() {
        var target = new LifeBoard({
            width: 2,
            height: 3
        });

        expect((target.getCell(0, 2)).constructor.name).toBe('LifeCell');
    });

    it('can also be initialized with an array of arrays of truthy and falsey values', function() {
        var target = new LifeBoard({
            cells: [
                [0, 1, 0, 1],
                [1, 0, 1, 0],
                [0, 1, 0, 1],
                [1, 0, 1, 0]
            ]
        });

        expect(target.getCell(0, 1).alive).toBe(true);
        expect(target.getCell(2, 2).alive).toBe(false);
    });

    it('returns how many living neighbors a given cell has', function() {
        var target = new LifeBoard({
            cells: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0],
                [0, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ]
        });

        expect(target.countLivingNeighbors(2, 2)).toBe(4);
        expect(target.countLivingNeighbors(1, 4)).toBe(1);
        expect(target.countLivingNeighbors(3, 4)).toBe(2);
    });

    describe('has progress method which', function() {
        var target;

        beforeEach(function() {
            target = new LifeBoard({
                cells: [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 1, 0],
                    [0, 0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            });
        });

        it('kills live cells with less than 2 live neighbors', function() {
            target.progress();

            expect(target.getCell(1, 2).alive).toBe(false);
        });

        it('kills live cells with more than 3 live neighbors', function() {
            target.progress();

            expect(target.getCell(3, 2).alive).toBe(false);
        });

        it('brings dead cells with exactly 3 live neighbors to life', function() {
            target.progress();

            expect(target.getCell(1, 3).alive).toBe(true);
        });
    });
});
