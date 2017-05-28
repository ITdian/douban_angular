/**
 * Created by Administrator on 2017/5/6.
 */
(function (angular) {

    angular.module('app').controller('musicController',['$scope','$routeParams','apiKey','xmgHttp',function ($scope,$routeParams,apiKey,xmgHttp) {

        //正在加载中
        $scope.isLoading = true;
        /*一页有多少条*/
        $scope.count = 5;
        /*共有多少页*/
        $scope.totalCount = "";
        /*当前页码*/
        $scope.curPage = 1;
        var start = ($scope.curPage -1) * $scope.count;   //(1-1)*5 = 0; (2-1)*5=5  (3-1)*5 =10
        /*
        * 高内聚： 在同一个文件当中。相同的代码给聚合到一起。 会降低代码的行数。提高程序的阅读性。
        * 低耦合： 一个文件尽力避免依赖其它的文件。
        * */
        /*加载数据*/
       $scope.loadData();


        //是否显示上一页
        $scope.isPrePage = false;
        /*是否显示下一页*/
        $scope.isNextPage = true;
        /*点击下一页，下一页*/
        $scope.pageChange = function (type) {
            /*判断当前点击是上一页，还是下一页*/
            if (type){
                /*下一页*/
                $scope.curPage++;
            }else {
                $scope.curPage--;
            }
            /*控制上一页，与下一页是否显示*/
            $scope.isPrePage = $scope.curPage == 1 ? false : true;
            $scope.isNextPage = $scope.curPage == $scope.totalCount ? false : true;
            /*当前开始请求的页码*/
            start = ($scope.curPage -1) * $scope.count;   //(1-1)*5 = 0; (2-1)*5=5  (3-1)*5 =10
            /*加载数据*/
            $scope.loadData();
        }


        /*加载数据*/
        $scope.loadData = function () {
            var type =  $routeParams.type;
            /*根据类型加载对应的数据-》从网络当中加载数据*/
            var url = "https://api.douban.com/v2/movie/"+type;
            var params = {
                apiKey:apiKey,
                start:start,
                count:5
            }
            /*
             * url:请求地址
             * params:请求参数
             * fn:回调函数
             * */
            xmgHttp.jsonp(url,params,function (data) {
                $scope.data = data;
                console.log(data);
                $scope.isLoading = false;
                $scope.totalCount = Math.ceil($scope.data.total / $scope.count);
                alert($scope.totalCount);
                /*更新界面数据*/
                $scope.$apply();
            });

        }

    }])

     .controller('detailController',['$scope','$routeParams','xmgHttp',function ($scope,$routeParams,xmgHttp) {
        var url = "https://api.douban.com/v2/movie/subject/"+$routeParams.id;

        xmgHttp.jsonp(url,null,function (data) {
            $scope.data = data;
            console.log(data);
            /*更新界面数据*/
            $scope.$apply();
        });

    }]);

})(angular);