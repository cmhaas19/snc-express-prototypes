(function () {

    angular.module("snc.prototype.sso.filter", []);
    angular.module("snc.prototype.sso.service", ["ui.bootstrap", "ngAnimate"]);
    angular.module("snc.prototype.sso.controller", ["snc.prototype.sso.service", "snc.prototype.sso.filter", "ui.bootstrap"]);
    angular.module("snc.prototype.sso.directive", ["ui.bootstrap"]);

    var module = angular.module("snc.prototype.sso.web",["ui.bootstrap",
                                                         "ngRoute",
                                                         "ngAnimate",
                                                         "ngSanitize",
                                                         "ngMessages",
                                                         "snc.prototype.sso.controller",
                                                         "snc.prototype.sso.service",
                                                         "snc.prototype.sso.directive",
                                                         "snc.prototype.sso.filter"]);

    module.run(["$rootScope", function ($rootScope) {

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            $rootScope.bodyClass = currentRoute.bodyClass;
        });
    }]);

}());