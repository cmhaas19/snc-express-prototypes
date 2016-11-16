(function (module) {

    var controller = function (pluginService, $timeout) {
        var ctrl = this;

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                	pluginService.getPlugins().then(function(plugins) {
                		ctrl.plugins = plugins;
                		$timeout(function () { e.success(plugins); }, 200);
                	});
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
            pageable: false,
            columns: [{
                    field: "name",
                    title: "Name"
                }, {
                    field: "id",
                    title: "ID"
                }, {
                    field: "description",
                    title: "Description"
                },{
                    field: "sms",
                    title: "SMS?"
                },{
                    field: "express",
                    title: "Express?"
                }
            ],
            dataSource: dataSource
        };
    };

    module.controller("controller", ["pluginService", "$timeout", controller]);

}(angular.module("snc.prototype.plugin")));