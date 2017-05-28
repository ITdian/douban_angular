/**
 * Created by Administrator on 2017/5/5.
 */
(function (angular) {
    /*配置路由*/
    angular.module('app').config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/movie/:type',{
            templateUrl:'musicList.html',
            controller:'musicController',
        }).when('/detail/:id',{
            templateUrl:'movie_detail_tpl.html',
            controller:'detailController',
        }).otherwise({
            redirectTo:'/movie/in_theaters'
        });
    }]);


    /*设置白名单*/
    angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://api.douban.com/**'
        ]);
    }]);


})(angular);