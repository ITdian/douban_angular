/**
 * Created by Administrator on 2017/5/5.
 */
(function (angular) {
    /*
    * 如果是当前路由，就添加指定的class
    * 其它的路由指定类
    * */
    angular.module('app').directive('routerSel',['$location',function ($location) {
        return{
            restrict:'A',
            link:function ($scope,ele,attr) {  //ele是一个jQuery对象
                /*获取当前的属性值*/
                console.log(attr.routerSel);
                $scope.$location = $location;
                $scope.$watch('$location.url()',function (newV,oldV) {
                    console.log(newV);
                    /*获取a标签的href值 与newValue进行对比，如果两个相等，*/
                   var href = ele.find('a').attr('href').slice(2);
                   console.log(href);
                   if (href == newV){
                       /*把所有li移除class*/
                        ele.parent().children().removeClass(attr.routerSel);
                        /*把当前的li添加class*/
                        ele.addClass(attr.routerSel);
                   }
                })
            }
        }
    }]);

})(angular);