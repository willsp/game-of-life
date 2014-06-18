/*global angular, LifeBoard*/

(function() {
    'use strict';

    var gameOfLife = angular.module('gameOfLife', []).
        filter('transform', function() {
        return function(input) {
            var out = 0;
            if (input) {
                out = 1;
            }
            return out;
        };
    }).
        filter('activate', function() {
        return function(input) {
            if (input) {
                return "active";
            }
        };
    });

    gameOfLife.controller('GameOfLifeCtrl', function GameOfLifeCtrl($scope) {
        var i, j, max, jmax;
        $scope.width = '5';
        $scope.height = '5';

        $scope.createBoard = function() {
            $scope.board = new LifeBoard({
                width: $scope.width,
                height: $scope.height
            });
        };

        $scope.toggleCell = function(cell) {
            if (cell.alive) {
                cell.alive = false;
            } else {
                cell.alive = true;
            }
        };

        $scope.next = function() {
            $scope.board.progress();
        };

        $scope.reset = function() {
            $scope.board = null;
        };
    });
}());

