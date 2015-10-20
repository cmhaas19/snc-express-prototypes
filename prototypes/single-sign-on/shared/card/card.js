(function (module) {

    var card = function () {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                name: "=",
                type: "=",
                badgeText: "=",
                icon: "@",
                cssClass: "@",                
                url: "@"
            },
            controller: ["$scope", function($scope){

                $scope.showBadge = function(){
                    console.log($scope.badgeText);
                    return angular.isDefined($scope.badgeText) && $scope.badgeText.length;
                };

            }],
            template: 
                "<a href='{{ url }}' class='card {{ cssClass }}'>" +
                    "<div class='card-thumbnail'>" + 
                        "<span class='card-icon'><i class='{{ icon }}' /></span>" +
                    "</div>" +
                    "<div class='card-content'>" + 
                        "<span class='card-title'>{{ name }} <span class='card-badge badge' ng-show='badgeText.length'>{{ badgeText }}</span></span>" +
                        "<span class='card-type'>{{ type }}</span>" + 
                    "</div>" +
                "</a>"
        };
    };

    module.directive("card", card);

}(angular.module("snc.prototype.sso.directive")))