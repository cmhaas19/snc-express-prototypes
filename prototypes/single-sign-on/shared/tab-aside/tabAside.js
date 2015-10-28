(function (module) {

    var tabAside = function () {
        return {
            restrict: "AE",
            replace: true,
            transclude: true,
            scope: {
                asideTitle: "=",
                asidePropertyCategory: "=",
                onHide: "&" 
            },

            controller: ["$scope", function($scope){

                $scope.hideAside = function(event){
                    if(typeof($scope.onHide) == "function"){
                        $scope.onHide({ e: { dataItem: $scope.isHidden  } });
                    }
                }
            }],

            link: function($scope, elem, attr, ctrl, transclude) {
                elem.find('.property-content').append(transclude());
            },

            template:
                "<div class=''>" +
                    "<div class='tab-aside-header'>" +
                        "<span> Configure </span>" +
                        "<a href='#/'' class='icon-cross pull-right' ng-click='hideAside($event)'></a>" +
                    "</div>" +
                    "<div class='property-content'></div>" +
                "</div>"

        };
    };

    module.directive("tabAside", tabAside);

}(angular.module("snc.prototype.sso.directive")))