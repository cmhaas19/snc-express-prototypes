(function (module) {

    var pluginService = function ($http, $q) {

        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa("admin:admin");

        var baseUrl = "https://empchaas1.service-now.com/";

        var getPluginDependencies = function() {
            var params = {
                method: "get",                
                url: baseUrl + "api/now/table/dpp_plugin_dependency",
                params: {
                    sysparm_query: "ORDERBYplugin_id",
                }
            };

            return $http(params).then(function(response){
                return response.data.result;
            });
        };

        var getPlugins = function() {
            var params = {
                method: "get",                
                url: baseUrl + "api/now/table/dpp_plugin",
                params: {
                    sysparm_query: "ORDERBYname",
                }
            };

            return $http(params).then(function(response){
                return response.data.result;
            });
        };

        var getPluginsWithDependencies = function() {
            return $q.all([getPlugins(), getPluginDependencies()]).then(function(results) {
                var plugins = results[0],
                    dependencies = results[1];
                
                plugins.forEach(function(plugin) {

                    var dependentPlugins = _.filter(dependencies, function(d){ return d.plugin_id == plugin.id; });

                    if(dependentPlugins && dependentPlugins.length) {
                        dependentPlugins.forEach(function(dependency) {
                            var p = _.find(plugins, function(t) { return t.id == dependency.required_plugin_id; });

                            if(p) {
                                if(angular.isUndefined(plugin.dependencies))
                                    plugin.dependencies = [];
                                plugin.dependencies.push(p);
                            }
                        });
                    }
                });

                return plugins;
            });
        };

        return {
            getPlugins: getPluginsWithDependencies
        };

    };

    module.factory("pluginService", ["$http", "$q", pluginService]);

}(angular.module("snc.prototype.plugin")));