(function (module) {

    var card = function () {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                cardDataItem: "=",
                cardTitle: "=",
                cardSubtitle: "=",
                cardBadgeText: "=",
                cardIconClass: "@",
                cardTheme: "@",                
                cardNew: "=",
                url: "=",
                actions: "=",
                onActionClick: "&",
                onCardClick: "&"                
            },
            controller: ["$scope", function($scope){

                var actionIcons = {
                    edit: "icon-edit",
                    users: "icon-user",
                    destroy: "icon-cross"
                };

                $scope.isNewCard = $scope.cardNew === true;
                $scope.cardActions = angular.fromJson($scope.actions) || [];

                $scope.getCssClass = function(){
                    var cssClasses = ["card"];

                    if(angular.isDefined($scope.cardTheme))
                        cssClasses.push("card-" + $scope.cardTheme);

                    if($scope.isNewCard)
                        cssClasses.push("card-add");

                    return cssClasses.join(" ");
                };

                $scope.getActionIconClass = function(action){
                    var cssClasses = ["action-icon"],
                        actionIcon = actionIcons[action.name];

                    if(angular.isDefined(action.iconClass)){
                        cssClasses.push(action.iconClass);
                    }
                    else if(angular.isDefined(actionIcon)){
                        cssClasses.push(actionIcon);
                    }

                    return cssClasses.join(" ");
                };

                $scope.cardClicked = function(event){
                    event.preventDefault();

                    if(typeof($scope.onCardClick) == "function"){
                        $scope.onCardClick({ e: { dataItem: $scope.cardDataItem  } });
                    }
                },

                $scope.actionClicked = function(event, action){
                    event.stopPropagation();

                    if(typeof($scope.onActionClick) == "function"){
                        $scope.onActionClick({ e: { dataItem: $scope.cardDataItem, action: action.name } });
                    }
                };

            }],
            template: 
                "<div ng-click='cardClicked($event)' ng-class='getCssClass()'>" +
                    "<div class='card-inner' ng-if='!isNewCard'>" + 
                        "<div class='card-thumbnail'>" + 
                            "<span class='card-icon'><i class='{{ cardIconClass }}' /></span>" +
                        "</div>" +
                        "<div class='card-content'>" + 
                            "<span class='card-title'>{{ cardTitle }} <span class='card-badge badge' ng-show='cardBadgeText.length'>{{ cardBadgeText }}</span></span>" +
                            "<span class='card-subtitle' ng-show='cardSubtitle.length'>{{ cardSubtitle }}</span>" + 
                        "</div>" +
                        "<div class='card-actions' ng-show='cardActions.length'>" +
                            "<a class='card-action' ng-repeat='action in cardActions' ng-click='actionClicked($event, action)' tooltip='{{ action.tooltip }}' tooltip-class='card-tooltip'><span ng-class='getActionIconClass(action)'></span></a>" +
                        "</div>" +
                    "</div>" +
                    "<div class='card-inner' ng-if='isNewCard'>" + 
                        "<div class='card-content'>" + 
                            "<span class='card-title'><span class='icon-add-circle-empty add-new-icon' />{{ cardTitle }}</span>" +
                        "</div>" +
                    "</div>" +
                "</div>"
        };
    };

    module.directive("card", card);

}(angular.module("snc.prototype.sso.directive")))