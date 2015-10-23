(function () {

    angular.module("snc.prototype.sso.filter", []);
    angular.module("snc.prototype.sso.service", ["ui.bootstrap", "ngAnimate"]);
    angular.module("snc.prototype.sso.controller", ["snc.prototype.sso.service", "snc.prototype.sso.filter", "ui.bootstrap"]);
    angular.module("snc.prototype.sso.directive", ["ui.bootstrap"]);

    var module = angular.module("snc.prototype.sso",["ui.bootstrap", 
                                                     "frapontillo.bootstrap-switch",
                                                     "ngRoute",
                                                     "ngAnimate",
                                                     "ngSanitize",
                                                     "ngMessages",
                                                     "snc.prototype.sso.controller",
                                                     "snc.prototype.sso.service",
                                                     "snc.prototype.sso.directive",
                                                     "snc.prototype.sso.filter"]);


    module.config(["$routeProvider", function($routeProvider) {

        var rootUrl = "/prototypes/single-sign-on";

        $routeProvider
            .when("/", {
                templateUrl: rootUrl + "/components/home/home.html",
                bodyClass: "home",
                backEnabled: false
            })
            .when("/identity-provider/:sysid", {
                templateUrl: rootUrl + "/components/identity-provider/idp.html",
                bodyClass: "idp",
                backEnabled: true
            })             
            .otherwise({
                redirectTo: "/"
            });
    }]);

    module.run(["$rootScope", function ($rootScope) {

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            $rootScope.bodyClass = currentRoute.bodyClass;
            $rootScope.backEnabled = currentRoute.backEnabled;
        });
    }]);

}());