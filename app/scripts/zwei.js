var zwei = angular.module('zwei', ['underscore']);
zwei.service('Zwei', ['$http', '_', function($http, _) {

    var _parseResBody = function(body) {
        var matches = body.match();
        return body.replace(/https?:\/\/(.+)(\s|<br>)/gm, '<a href="$&" target="_blank">$&$2</a>');
    }

    var _parseRes = function(resLine, index) {
        var matches = resLine.match(/(.*)<>(.*)<>(.+)ID:(.+)<>(.+)<>(.*)/);
        return {
            number: index + 1,
            name: matches[1],
            mail: matches[2],
            date: matches[3],
            userId: matches[4],
            body: _parseResBody(matches[5]),
            threadTitle: matches[6] || ''
        };
    }

    /**
     * スレッドのdatファイルの内容をぱーすする
     * @param dat
     * @returns {{title: *, resList: Array}}
     * @private
     */
    var _parseThread = function(dat) {
        var resLineList = _.initial(dat.split("\n"));
        var resList = _.map(_.initial(dat.split("\n")), _parseRes);
        return {
            // スレッドタイトルは最初の書き込みに付加されている
            title: resList[0].threadTitle,
            resList: resList
        };
    }

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

    this.getThread = function(datUrl, callback) {
        $http.get(datUrl).then(function(response) {
            callback(_parseThread(response.data));
        })
    }
}]);