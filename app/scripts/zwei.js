var zwei = angular.module('zwei', ['underscore']);
zwei.service('Zwei', ['$http', '_', function($http, _) {

    /**
     * 指定したタイトルの板情報を取得する
     * @param boardTitle
     * @param callback
     */
    this.getBoard = function(boardTitle, callback) {
        $http.get('http://38-ch.net/bbsmenu/get?format=json&charset=UTF-8').then(function(response) {
            var categories = response.data.bbsmenu.category;
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                var boards = category.board;
                var board = _.findWhere(boards, {title: boardTitle});
                if (board !== undefined) {
                    callback(board);
                    break;
                }
            }
        });
    }

    /**
     * 指定した板のスレッド一覧を取得する
     * @param board
     * @param callback
     */
    this.getThreads = function(board, callback) {
        $http.get('http://yysk.jp/test/kenmou.php').then(function(response) {
            callback(response.data);
        });
    }
}]);