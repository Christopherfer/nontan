var app = angular.module('nontan', ['zwei', 'underscore']);
app.controller('MainController', ['$scope', 'Zwei', '_', function($scope, Zwei, _) {
    // 嫌儲板のスレッド一覧を取得
    Zwei.getBoard('ニュー速(嫌儲)', function(board) {
        Zwei.getThreads(board, function(threads) {
            $scope.threads = _.filter(threads, function(t) {
                return t.title.indexOf('ラブライブ') > -1;
            });
        });
    });
}]);