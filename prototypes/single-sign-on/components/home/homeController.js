(function (module) {

    var homeController = function (idpService, federationService) {
        var model = this;

        model.settings = {
        	enabled: true,
        	debugging: false,
        	autoImport: true
        };

        idpService.getAll().then(function(data){

            var viewModels = data.map(function(item){
                return {
                    name: item.name,
                    type: item.type,
                    badgeText: (item.isDefault ? "Default" : ""),
                    icon: "fa fa-database",
                    cssClass: "card-idp"
                };
            });

    		model.identityProviders = viewModels;
        });

        federationService.getAll().then(function(data){
    		model.federations = data;
        });

    };

    module.controller("homeController", ["idpService", "federationService", homeController]);

}(angular.module("snc.prototype.sso.controller")));