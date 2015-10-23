(function (module) {

    var homeController = function (idpService, federationService) {
        var model = this;

        model.idpClicked = function(e){
            console.log(e);
        };

        model.idpActionClicked = function(e){
            console.log(e);
        };

        idpService.getAll().then(function(data){

            var viewModels = data.map(function(item){
                return {
                    name: item.name,
                    type: item.type,
                    badgeText: (item.isDefault ? "Default" : "")
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