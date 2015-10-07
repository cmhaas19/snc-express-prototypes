(function (module) {

    var newCard = function () {
        return {
            restrict: "AE",
            scope: {
                
            },
            template: 
                "<div class='card card-add'>" +
                    "<span class='card-icon'><i class='fa fa-plus-circle' /></span>" +
                    "<span class='card-title'>Create New</span>" +
                "</div>"
        };
    };

    module.directive("newCard", newCard);

}(angular.module("snc.prototype.sso.directive")))