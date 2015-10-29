(function (module) {

    var tabAside = function () {
        return {
            restrict: "AE",
            replace: true,
            transclude: true,
            scope: {
                title: "=?asideTitle",
                toggleButton: "@",
                visible: "=?" 
            },

            controller: ["$scope", function($scope) {

                $scope.visible = angular.isDefined($scope.visible) && $scope.visible;

                $scope.toggle = function(e) {
                    $scope.visible = !$scope.visible;
                };

            }],

            link: function(scope, elem, attr) {
                var toggleButton = scope.toggleButton;

                if(toggleButton && toggleButton.length){
                    
                    var $button = $(toggleButton);

                    $button.on("click", function(e){
                        e.preventDefault();
                        scope.toggle(e);
                        scope.$apply();
                    });

                    scope.$watch("visible", function(newValue){
                        if(newValue === true)
                            $button.addClass("active");
                        else
                            $button.removeClass("active");
                    });
                }

            },

            template:
                "<div class='tab-aside-container' ng-class='{ closed: !visible }'>" +
                    "<div class='tab-aside-header clearfix'>" +
                        "<span class='tab-aside-title' ng-show='title.length'>{{ title }}</span>" +
                        "<span class='tab-aside-close icon-cross' ng-click='toggle()'></a>" +
                    "</div>" +
                    "<div class='tab-aside-content'>" + 
                        "<ng-transclude></ng-transclude>" +
                    "</div>" +
                "</div>"

        };
    };

    module.directive("tabAside", tabAside);

}(angular.module("snc.prototype.sso.directive")))