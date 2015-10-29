(function (module) {

    var propertyService = function ($http, $q) {

    	var data = [{
    		title: "Single Sign-On (SSO)",
            id: "sso_allow",
    		type: "boolean",
            desc: "Allow users to login with SSO credentials",
            value: true
    	}, {
            title: "Auto-Import Users",
            id: "auto_import_user",
            type: "boolean",
            desc: "Enable this option to automatically populate users from available identity Providers",
            value: false
        }, {
            title: "SSO Debugging",
            id: "sso_debugging",
            type: "boolean",
            desc: "Enable this option to show debug messages for SSO",
            value: true
        }, {
            title: "User Identifier",
            id: "user_identifier",
            type: "select",
            desc: "Set the identifier to be used for assertions",
            value: [{ value: 'username', current: true }, { value: 'identifier2', current: false }, { value: 'identifier3', current: false }]
        }, {
            title: "Listener Response Interval",
            id: "listener_response_interval",
            type: "string",
            desc: "The amount of time the listener will wait for a response from the LDAP server. After this amount of time the listener will rocess any notifications it has received and will reissue the listen request to the server. The value should be specified in minutes.",
            value: "5"
        }, {
            title: "LDAP Password Authentication",
            id: "ldap_password_auth",
            type: "boolean",
            desc: "",
            value: true
        }, {
            title: "Automatically Import Users",
            id: "auto_import_user",
            type: "boolean",
            desc: "Enable this option to automatically import users from the LDAP servers if the user is not present in the 'sys_user' table.",
            value: true
        }, {
            title: "Page Results",
            id: "listener_response_interval",
            type: "boolean",
            desc: "Enable this option to page retrieved results if the LDAP server supports paging.",
            value: false
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