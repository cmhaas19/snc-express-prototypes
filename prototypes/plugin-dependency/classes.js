

class Node {
    constructor(plugin) {
    	this.id = plugin.id;
    	this.name = plugin.name;
    	this.plugin = plugin;
    	this.childNodes = [];
    }
}

class chainBuilder {

	constructor(plugins, dependencies) {
		this.plugins = plugins;
		this.dependencies = dependencies;
		this.activated = {};
	}

	build() {
		var nodes = [];
		var that = this;

		that.plugins.forEach(function(plugin){
			// Re-start chain
			that.activated = {};

			var node = that.buildChain(plugin);

			if(node)
				nodes.push(node);
		});

		return nodes;
	}

	buildChain(plugin) {
		var node = new Node(plugin);
		var that = this;

		// Check if we've already processed this guy
		if(that.isActive(node))
			return node;

		// Mark as processed to prevent recursion
		that.activated[node.id] = node.id;

		var dependencies = that.getDependencies(node);

		dependencies.forEach(function(dependency){
			var childNode = that.buildChain(dependency.requiredPlugin);

			if(childNode) {
				node.childNodes.push(childNode);
			}
		});

		return node;
	}

	getDependencies(node) {
		return _.filter(this.dependencies, function(d){ return d.plugin.id == node.id; });
	}

	isActive(node) {
		return angular.isDefined(this.activated[node.id]);
	}
}