/**
 * Created by Administrator on 2017/5/5.
 */
(function (angular) {

    angular.module('app').service('xmgHttp',['$window',function ($window) {
        /**
         * 跨域请求数据
         * @param url 请求地址
         * @param params 请求参数
         * @param fn  请求成功时回调
         */
        this.jsonp = function (url,params,fn) {
            /*1.在本地创建一个函数*/
            /*1.1 随机生成一个函数名称*/
            var callBackName = 'xmg_callback'+ Math.random().toString().slice(2);
            $window[callBackName] = function (data){
                fn(data);
                /*数据加载成功之后， 删除自己添加的标签*/
                $window.document.body.removeChild(newScript);
            };
            /*2.通过src属性请求网络地址。把本地的函数名称传递去过*/
            /*2.1 动态创建一个script标签 把它插入到DOM节点当中*/
            var newScript = $window.document.createElement('script');
            /*格式参数*/
           var queryString = "";
           for(var key in params){
               queryString += key +'='+params[key]+'&'
           }
           /*拼接地址*/
           queryString += 'callback='+callBackName;
            url = url+'?'+queryString;
            /*设置请求地址*/
            newScript.src = url;
            $window.document.body.appendChild(newScript);
        };

    }]);


})(angular);