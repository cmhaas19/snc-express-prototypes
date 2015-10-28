(function (module) {

    var propertyService = function ($http, $q) {

    	var data = [{
    		title: "Single Sign-On (SSO)",
            id: "sso_allow",
    		type: "bool",
            desc: "Allow users to login with SSO credentials",
            value: true
    	}, {
            title: "Auto-Import Users",
            id: "auto_import_user",
            type: "bool",
            desc: "Enable this option to automatically populate users from available identity Providers",
            value: false
        }, {
            title: "SSO Debugging",
            id: "sso_debugging",
            type: "bool",
            desc: "Enable this option to show debug messages for SSO",
            value: true
        }, {
            title: "User Identifier",
            id: "user_identifier",
            type: "select",
            desc: "Set the identifier to be used for assertions",
            value: [{ value: 'username', current: true }, { value: 'identifier2', current: false }, { value: 'identifier3', current: false }]
        }];
        
        var getAll = function(){
        	return $q.when(data);
        };

        return {
            getAll: getAll
        };

    };

    module.factory("propertyService", ["$http", "$q", propertyService]);

}(angular.module("snc.prototype.sso.service")));