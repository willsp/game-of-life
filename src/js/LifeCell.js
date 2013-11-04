(function(global) {
    'use strict';

    function LifeCell(init) {
        this.alive = (init && init.alive) ? true : false;
    };

    global.LifeCell = LifeCell;
}(window));

