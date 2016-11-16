(function (module) {

    var pluginService = function ($http, $q) {

        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa("admin:admin");

        var baseUrl = "https://empchaas1.service-now.com/";

        var getPlugins = function() {
            return $http.get(baseUrl + "api/now/table/dpp_plugin").then(function(response){
                return response.data.result;
            });
        };

        return {
            getPlugins: getPlugins
        };

    };

    module.factory("pluginService", ["$http", "$q", pluginService]);

}(angular.module("snc.prototype.plugin")));