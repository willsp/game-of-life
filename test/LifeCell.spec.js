/*global describe, it, expect*/

describe('A LifeCell', function() {
    'use strict';

    it('is initialized as dead or alive', function() {
        var alive = new LifeCell({alive: true});
        var dead = new LifeCell({alive: false});

        expect(alive.alive).toBe(true);
        expect(dead.alive).toBe(false);
    });

    it('is dead unless specified as alive', function() {
        var target = new LifeCell();

        expect(target.alive).toBe(false);
    });
});
