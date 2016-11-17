(function (module) {

    var controller = function (pluginService, $timeout, $scope) {
        var ctrl = this;

        ctrl.plugins = [];
        ctrl.selectedCount = 0;
        ctrl.selectedDependencyCount = 0;      
        ctrl.selectedPlugins = [];  

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                	pluginService.getPlugins().then(function(nodes) {
                		ctrl.nodes = nodes;
                        var data = _.map(nodes, function(node){
                            return {
                                id: node.id,
                                name: node.plugin.name,
                                description: node.plugin.description,
                                sms: node.plugin.sms,
                                express: node.plugin.express,
                                depcount: node.childNodes.length
                            };
                        })
                		$timeout(function () { e.success(data); }, 200);
                	});
                }
            }
        });

        var findNode = function(id) {
            return _.find(ctrl.nodes, function(p) { return p.id == id; });
        };

        var updateCounts = function() {
            var count = 0;

            ctrl.selectedPlugins.forEach(function(p){
                count += p.childNodes.length;
            });

            ctrl.selectedCount = ctrl.selectedPlugins.length;
            ctrl.selectedDependencyCount = count;  
        };

        var addSelectedPlugin = function(node) {
            var existingPlugin = _.find(ctrl.selectedPlugins, function(p){ return p.id == node.id; });

            if(existingPlugin == undefined) {
                ctrl.selectedPlugins.push(node);
                ctrl.treeData.add(node);
            }
        };

        var removeSelectedPlugin = function(node) {
            _.remove(ctrl.selectedPlugins, function(p){ return p.id == node.id; });
        };

        ctrl.selectPlugin = function(item) { 
            var node = findNode(item.id);

            if(item.selected) 
                addSelectedPlugin(node);
            else
                removeSelectedPlugin(node);

            updateCounts();
        };

        ctrl.treeData = new kendo.data.HierarchicalDataSource({
            data: [],
            schema: {
                model: {
                    children: "childNodes"
                }
            }
        });

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
                    width: 65,
                    attributes: { "class": "text-center" },
                    headerAttributes: { "class": "text-center" },
                    template: "#= (sms == 'true') ? \"<span class='fa fa-check'></span>\" : '' #"
                },{
                    field: "express",
                    title: "Express?",
                    width: 80,
                    attributes: { "class": "text-center" },
                    headerAttributes: { "class": "text-center" },
                    template: "#= (express == 'true') ? \"<span class='fa fa-check'></span>\" : '' #"
                }
            ],
            dataSource: dataSource
        };
    };

    module.controller("controller", ["pluginService", "$timeout", "$scope", controller]);

}(angular.module("snc.prototype.plugin")));