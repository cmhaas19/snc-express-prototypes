(function (module) {

    class Plugin {
        constructor(id, name, description, sms, express) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.sms = sms;
            this.express = express;
            this.dependencies = [];
        }

        addDependency(dependency) {
            this.dependencies.push(dependency);
        }
    }

    class Dependency {
        constructor(type, plugin, requiredPlugin) {
            this.type = type;
            this.plugin = plugin;
            this.requiredPlugin = requiredPlugin;
        }
    }

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
                var plugins = [],
                    dependencies = [];

                results[0].forEach(function(p) {
                    plugins.push(new Plugin(p.id, p.name, p.description, p.sms, p.express));
                });

                results[1].forEach(function(d){
                    var plugin = _.find(plugins, function(p) { return p.id == d.plugin_id; });
                    var requiredPlugin = _.find(plugins, function(p) { return p.id == d.required_plugin_id; });

                    if(plugin)
                        dependencies.push(new Dependency(d.type, plugin, requiredPlugin));
                });

                return buildDependencyChain(plugins, dependencies);
            });
        };

        var buildDependencyChain = function(plugins, dependencies) {
            plugins.forEach(function(plugin) {

                var dependentPlugins = _.filter(dependencies, function(d){ return d.plugin.id == plugin.id; });

                if(dependentPlugins && dependentPlugins.length) {
                    dependentPlugins.forEach(function(dependency) {
                        plugin.addDependency(dependency);
                        /*
                        if(dependency.requiredPlugin) {
                            plugin.dependencies.push(angular.extend({}, dependency.requiredPlugin, { parentId: plugin.id }));
                        }
                        */
                    });
                }
            });

            console.log(plugins);

            return plugins;
        };

        return {
            getPlugins: getPluginsWithDependencies
        };

    };

    module.factory("pluginService", ["$http", "$q", pluginService]);

}(angular.module("snc.prototype.plugin")));