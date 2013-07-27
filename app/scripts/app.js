var app = angular.module('nontan', ['zwei', 'underscore']);
// chrome-extension:プロトコルでunsafeにならないようにする
app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|chrome-extension):/);
}]);
app.controller('MainController', ['$scope', 'Zwei', '_', function($scope, Zwei, _) {
    /*
    Zwei.getBoard('ニュー速(嫌儲)', function(board) {
        Zwei.getThreads(board, function(threads) {
            $scope.threads = _.filter(threads, function(t) {
                return t.title.indexOf('ラブライブ') > -1;
            });
        });
    });
    */
    Zwei.getThread('test.dat', function(thread) {
        $scope.thread = thread;
        $scope.images = [];
        _.forEach(thread.resList, function(res) {
            var matches = res.body.match(/https?:\/\/(.+)\.(jpg|png|gif)/);
            if (matches !== null) {
                $scope.images.push({
                    url: matches[0]
                });
            }
        })
    });
}]);