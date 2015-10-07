(function (module) {

    var card = function () {
        return {
            restrict: "AE",
            scope: {
                name: "=",
                type: "=",
                icon: "@",
                isDefault: "="
            },
            template: 
                "<div class='card'>" +
                    "<span class='card-title'>{{ name }}</span>" +
                    "<span class='card-type'>{{ type }}</span>" +
                    "<span class='card-icon {{ icon }}'><i class='fa fa-lock' /></span>" +
                    "<span class='card-default' ng-show='isDefault'><i class='fa fa-check-circle-o' /></span>" +
                "</div>"
        };
    };

    module.directive("card", card);

}(angular.module("snc.prototype.sso.directive")))