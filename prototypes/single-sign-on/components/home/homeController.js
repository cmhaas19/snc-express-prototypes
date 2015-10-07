(function (module) {

    var homeController = function (idpService, federationService) {
        var model = this;

        model.settings = {
        	enabled: true,
        	debugging: false,
        	autoImport: true
        };

        idpService.getAll().then(function(data){
    		model.identityProviders = data;
        });

        federationService.getAll().then(function(data){
    		model.federations = data;
        });

    };

    module.controller("homeController", ["idpService", "federationService", homeController]);

}(angular.module("snc.prototype.sso.controller")));