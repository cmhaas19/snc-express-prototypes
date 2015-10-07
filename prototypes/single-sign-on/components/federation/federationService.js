(function (module) {

    var federationService = function ($http, $q) {

    	var data = [{
    		name: "InCommon"
    	}];
        
        var getAll = function(){
        	return $q.when(data);
        };

        return {
            getAll: getAll
        };

    };

    module.factory("federationService", ["$http", "$q", federationService]);

}(angular.module("snc.prototype.sso.service")));