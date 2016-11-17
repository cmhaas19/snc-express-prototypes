(function (module) {

    var controller = function (pluginService, $timeout) {
        var ctrl = this;

        ctrl.plugins = [];
        ctrl.selectedCount = 0;
        ctrl.selectedDependencyCount = 0;      
        ctrl.selectedPlugins = [];  

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                	pluginService.getPlugins().then(function(plugins) {
                		ctrl.plugins = plugins;

                        var data = _.map(plugins, function(p){
                            return {
                                name: p.name,
                                id: p.id,
                                description: p.description,
                                sms: p.sms,
                                express: p.express,
                                depcount: angular.isArray(p.dependencies) ? p.dependencies.length : 0
                            };
                        });
                		$timeout(function () { e.success(data); }, 200);
                	});
                }
            }
        });

        var findPlugin = function(id) {
            return _.find(ctrl.plugins, function(p) { return p.id == id; });
        };

        var updateCounts = function() {
            var count = 0;

            ctrl.selectedPlugins.forEach(function(p){
                count += angular.isArray(p.dependencies) ? p.dependencies.length : 0;
            });

            ctrl.selectedCount = ctrl.selectedPlugins.length;
            ctrl.selectedDependencyCount = count;  
        };

        var addSelectedPlugin = function(plugin) {
            var existingPlugin = _.find(ctrl.selectedPlugins, function(p){ return p.id == plugin.id; });
            if(existingPlugin == undefined)
                ctrl.selectedPlugins.push(plugin);
        };

        var removeSelectedPlugin = function(plugin) {
            _.remove(ctrl.selectedPlugins, function(p){ return p.id == plugin.id; });
        };

        ctrl.selectPlugin = function(plugin) {                   
            var p = findPlugin(plugin.id);

            if(plugin.selected)
                addSelectedPlugin(p);
            else
                removeSelectedPlugin(p);

            updateCounts();
        };

        ctrl.gridOptions = {
        	autoBind: true,
            height: 500,
            scrollable: true,
            noRecords: true,
            sortable: {
                mode: "single",
                allowUnsort: false
            },
            pageable: {
                numeric: false,
                previousNext: false,
                messages: {
                    display: "Total: {2}"
                }
            },
            columns: [{
                    title: "",
                    template: '<input ng-model="dataItem.selected" type="checkbox" ng-change="ctrl.selectPlugin(dataItem)"></input>',
                    width: 30
                },{
                    field: "name",
                    title: "Name"
                }, {
                    field: "id",
                    title: "ID"
                }, {
                    field: "description",
                    title: "Description"
                },{
                    field: "depcount",
                    title: "# Deps",
                    width: 65
                },{
                    field: "sms",
                    title: "SMS?",
                    width: 65
                },{
                    field: "express",
                    title: "Express?",
                    width: 80
                }
            ],
            dataSource: dataSource
        };
    };

    module.controller("controller", ["pluginService", "$timeout", controller]);

}(angular.module("snc.prototype.plugin")));