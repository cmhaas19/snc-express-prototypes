(function (module) {

    var idpService = function ($http, $q) {

    	var data = [{
    		name: "ADFS",
    		type: "SAML 2.0",
    		isDefault: true
    	}, {
    		name: "SiteMinder",
    		type: "SAML 2.0"
    	}];
        
        var getAll = function(){
        	return $q.when(data);
        };

        return {
            getAll: getAll
        };

    };

    module.factory("idpService", ["$http", "$q", idpService]);

}(angular.module("snc.prototype.sso.service")));