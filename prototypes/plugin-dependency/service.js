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
                    sysparm_limit: 30000
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
                    dependencies = [];

                results[1].forEach(function(d){
                    var plugin = _.find(plugins, function(p) { return p.id == d.plugin_id; });
                    var requiredPlugin = _.find(plugins, function(p) { return p.id == d.required_plugin_id; });

                    if(plugin)
                        dependencies.push({ type: d.type, plugin: plugin, requiredPlugin: requiredPlugin });
                });

                var builder = new chainBuilder(plugins, dependencies);
                var nodes = builder.build();
                //console.log(nodes);

                return nodes;
            });
        };

        return {
            getPlugins: getPluginsWithDependencies
        };

    };

    module.factory("pluginService", ["$http", "$q", pluginService]);

}(angular.module("snc.prototype.plugin")));