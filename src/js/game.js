/*global LifeBoard*/

(function($) {
    'use script';

    var lifeBoard;

    function createBoard(width, height) {
        var insert = [];
        var x, y;

        for (y = 0; y < height; y++) {
            insert.push('<div>');
            for (x = 0; x < width; x++) {
                insert.push('<span data-pos-x="' + x + '" data-pos-y="' + y + '">');
                insert.push('<input type="checkbox">');
                insert.push('</span>');
            }
            insert.push('</div>');
        }

        clearBoard();
        $('#board').append(insert.join(''));
        $('body').addClass('started');
    }

    function bindBoard() {
        var cells = [];

        if (!lifeBoard) {
            $('#board span').each(function() {
                var $this = $(this);
                var x = $this.data('pos-x');
                var y = $this.data('pos-y');

                cells[y] = cells[y] || [];
                cells[y][x] = $this.find('input').prop('checked');
            });

            lifeBoard = new LifeBoard({
                cells: cells
            });
        }

        lifeBoard.progress();
        $('#board span').each(function() {
            var $this = $(this);
            var x = $this.data('pos-x');
            var y = $this.data('pos-y');

            $this.html((lifeBoard.getCell(x, y).alive) ? 1 : 0);
        });
    }

    function clearBoard() {
        $('#board').html('');
        lifeBoard = undefined;
        $('body').removeClass('started');
    }

    function bindButtons() {
        $('#create').on('click', function() {
            createBoard($('#width').val(), $('#height').val());
        });

        $('#next').on('click', function() {
            bindBoard();
        });

        $('#reset').on('click', function() {
            clearBoard();
        });
    }

    $(function() {
        bindButtons();
    });

}(jQuery));
