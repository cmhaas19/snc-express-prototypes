(function (module) {

    var configService = function ($http, $q) {

    	var data = [{
    		name: "Single Sign-On (SSO)",
            description: "Allow users to login with SSO credentials.",
    		type: "boolean",
            value: true
    	}, {
    		name: "Auto-Import Users",
            description: "Enable this option to automatically populate users from available identity Providers",
    		type: "boolean",
            value: false
    	}, {
            name: "SSO Debugging",
            description: "Enable this option to show debug messages for SSO",
            type: "boolean",
            value: true
        }];
        
        var getAll = function(){
        	return $q.when(data);
        };

        return {
            getAll: getAll
        };

    };

    module.factory("configService", ["$http", "$q", idpService]);

}(angular.module("snc.prototype.sso.service")));