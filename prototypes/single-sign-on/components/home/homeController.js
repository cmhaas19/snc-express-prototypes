(function (module) {

    var homeController = function (idpService, federationService, propertyService) {
        var model = this;

        model.isHidden = false;

        model.toggle = function(e){
            model.isHidden = model.isHidden === false ? true: false;
        };

        model.getHide = function(){
            return model.isHidden;
        };

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

        propertyService.getAll().then(function(data){
            model.properties = data;
        });

    };

    module.controller("homeController", ["idpService", "federationService", "propertyService", homeController]);

}(angular.module("snc.prototype.sso.controller")));