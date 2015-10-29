(function (module) {

    var asideProperty = function () {
        return {
            restrict: "AE",
            scope: {
                propertyTitle: "=",
                propertyId: "=",
                propertyType: "=",
                propertyDesc: "=",
                propertyValue: "="

            },

            controller: ["$scope", function($scope){
                $scope.isBool = $scope.propertyType === "boolean"; 
                $scope.isSelect = $scope.propertyType === "select"; 
                $scope.isString = $scope.propertyType === "string"; 

            }],

            template:
                "<div class='property-obj'>" +
                    "<div class='bool-type' ng-if='isBool'>" +
                        "<div class='label-row'>" +
                            "<label for='allow_sso'>{{ propertyTitle }}</label>" +
                            "<div class='input-switch pull-right'>" +
                                "<input id='{{ propertyId }}_switch' type='checkbox' ng-model='propertyValue' name='{{ propertyId }}_switch'>" +
                                "<label aria-hidden='true' class='switch' for='{{ propertyId }}_switch'></label>" +
                            "</div>" +
                        "</div>" +
                        "<div class='tab-aside-description'>{{ propertyDesc }}</div>" +
                    "</div>" +
                    "<div class='select-type' ng-if='isSelect'>" +
                        "<label for='allow_sso'>{{ propertyTitle }}</label>" +
                        "<div class='tab-aside-description'>{{ propertyDesc }}</div>" +
                        "<select id='{{ propertyId }}_select' class='form-control' name='{{ propertyId }}' ng-model='current'>" +
                            "<option  ng-repeat='option in propertyValue' value='{{option.value}}' ng-selected='{{option.current}}'>{{option.value}}</option>" +
                        "</select>" +
                    "</div>" +
                    "<div class='select-type' ng-if='isString'>" +
                        "<label for='allow_sso'>{{ propertyTitle }}</label>" +
                        "<div class='tab-aside-description'>{{ propertyDesc }}</div>" +
                        "<input id='{{ propertyId }}_string' class='form-control' type='text' value='{{ propertyValue }}' name='{{ propertyId }}' />" +
                    "</div>" +
                "</div>"
        };
    };

    module.directive("asideProperty", asideProperty);

}(angular.module("snc.prototype.sso.directive")))