(function () {

    var module = angular.module("snc.prototype.plugin",["kendo.directives", 
                                                        "ngRoute",
                                                        "ngAnimate",
                                                        "ngSanitize",
                                                        "ngMessages"]);


    module.config(["$routeProvider", function($routeProvider) {

        var rootUrl = "/prototypes/plugin-dependency";

        $routeProvider
            .when("/", {
                templateUrl: rootUrl + "/components/home/home.html"
            })           
            .otherwise({
                redirectTo: "/"
            });
    }]);

    module.run(["$rootScope", function ($rootScope) {

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            
        });
    }]);

}());