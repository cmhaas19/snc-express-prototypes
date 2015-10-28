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
                $scope.isBool = $scope.propertyType === "bool"; 
                $scope.isSelect = $scope.propertyType === "select"; 

            }],


            template:
                "<div class='property-obj'>" +
                    "<div class='bool-type' ng-if='isBool'>" +
                        "<div class='label-row'>" +
                            "<label for='allow_sso'>{{ propertyTitle }}</label>" +
                            "<div class='input-switch pull-right'>" +
                                "<input id='{{ propertyId }}_switch' type='checkbox' checked='checked' name='{{ propertyId }}_switch'>" +
                                "<label aria-hidden='true' class='switch' for='{{ propertyId }}_switch'></label>" +
                            "</div>" +
                        "</div>" +
                        "<div class='tab-aside-description'>{{ propertyDesc }}</div>" +
                    "</div>" +
                    "<div class='select-type' ng-if='isSelect'>" +
                        "<label for='allow_sso'>{{ propertyTitle }}</label>" +
                        "<div class='tab-aside-description'>{{ propertyDesc }}</div>" +
                        "<select id='{{ propertyId }}_select' class='form-control' name='{{ propertyId }}'>" +
                            "<option>Username</option>" +
                            "<option>User Identifier 2</option>" +
                            "<option>User Identifier 3</option>" +
                        "</select>" +
                    "</div>" +
                "</div>"
        };
    };

    module.directive("asideProperty", asideProperty);

}(angular.module("snc.prototype.sso.directive")))