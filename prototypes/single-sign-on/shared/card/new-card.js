(function (module) {

    var newCard = function () {
        return {
            restrict: "AE",
            scope: {
                url: "@"
            },
            template: 
                "<a href='{{ url }}' class='card card-add'>" +
                    "<div class='card-content'>" + 
                        "<span class='card-title'><span class='icon-add-circle-empty' /> Add New</span>" +
                    "</div>" +
                "</a>"
        };
    };

    module.directive("newCard", newCard);

}(angular.module("snc.prototype.sso.directive")))